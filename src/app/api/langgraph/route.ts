import {
  AIStream,
  AIStreamCallbacksAndOptions,
  LangChainAdapter,
  StreamingTextResponse
} from 'ai'
import { stateGraph } from '@/lib/models/state-graph'
import { AIMessageChunk, HumanMessage } from '@langchain/core/messages'
import { ChatGenerationChunk } from '@langchain/core/outputs'
import { IterableReadableStream } from '@langchain/core/utils/stream'
import { StreamEvent } from '@langchain/core/dist/tracers/event_stream'

// Set the runtime to edge for best performance
export const runtime = 'edge'

type AIStreamChunk = {
  content: string
  additional_kwargs: any
  type: string
  example: boolean
}

function customParser() {
  return (event: any) => {
    switch (event.event) {
      case 'on_llm_start':
        console.log('*****************************************')
        console.log('On LLM Start')
        //console.log('Chunk:', event)
        return { completion: '', token: 'tok' }

      case 'on_llm_stream':
        const chunk: ChatGenerationChunk = event.data?.chunk
        const msg = chunk.message as AIMessageChunk
        //console.log('Chunk received:', chunk)

        if (msg.tool_call_chunks && msg.tool_call_chunks.length > 0) {
          // Handle tool call chunks if needed
          console.log('*****************************************')
          console.log('Tool call chunks:', msg.tool_call_chunks)
        } else {
          // Return the content
          const messageContent = msg.content
          console.log('*****************************************')
          console.log('Message content:', messageContent)
          return { completion: messageContent, token: '' }
        }
      default:
        //console.log('*****************************************')
        //console.error('Event:', event.event)
        return null
    }
  }
}

function FetchStream(
  stream: IterableReadableStream<StreamEvent>,
  cb?: AIStreamCallbacksAndOptions
): ReadableStream {
  const parser = customParser()

  return new ReadableStream<string>({
    async start(controller) {
      cb?.onStart?.()
      console.log('Mandou para o callback o start')

      for await (const event of stream) {
        const parsed = parser(event)
        const encoder = new TextEncoder() // Create a TextEncoder

        if (parsed) {
          // Convert the parsed object to a string

          const output = parsed.completion.toString()
          console.log('Enqueuing:', output)
          const encodedOutput = encoder.encode(output) // Encode the output to ArrayBuffer
          controller.enqueue(encodedOutput.toString()) // Enqueue the encoded data

          cb?.onCompletion?.(parsed.completion.toString())
          cb?.onToken?.(parsed.token)
        }
      }

      controller.close()
      cb?.onFinal?.('final')
    },
    cancel() {
      cb?.onFinal?.('final')
    }
  })
}

async function simpleStreamExample() {
  const stream = new ReadableStream({
    start(controller) {
      const chunks = ['Hello, ', 'world!', 'This is a test.']
      for (const chunk of chunks) {
        console.log('Enqueuing:', chunk)
        controller.enqueue(chunk)
      }
      controller.close()
    }
  })

  return stream
}

async function consumeStream(stream: ReadableStream<any>) {
  if (!stream || typeof stream.getReader !== 'function') {
    console.error('Provided stream is not a ReadableStream:', stream)
    return
  }

  const reader = stream.getReader()
  const decoder = new TextDecoder()

  while (true) {
    const { done, value } = await reader?.read()
    if (done) {
      console.log('Stream reading done.')
      break
    }
    console.log('Received chunk:', decoder.decode(value))
  }
}

async function testStreamingTextResponse() {
  try {
    const stream = await simpleStreamExample()
    console.log('Testing StreamingTextResponse:')

    // Create an instance of StreamingTextResponse with the stream
    const response = new StreamingTextResponse(stream, {})

    console.log('StreamingTextResponse created successfully:')
    // Read from the response body stream
    const reader = response.body?.getReader()
    const decoder = new TextDecoder()

    while (true) {
      // @ts-ignore
      const { done, value } = await reader.read()
      if (done) {
        console.log('Stream reading done.')
        break
      }
      console.log('Received chunk:', decoder.decode(value))
    }
  } catch (error) {
    console.error('Error creating StreamingTextResponse:', error)
  }
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  const prompt = await req.json() // Assuming modelType is provided in the request

  const { messages, data } = prompt

  console.log(messages)

  const app = await stateGraph()

  // const messagese = transformMessages(messages)

  const inputs = {
    messages: [new HumanMessage('what is the weather in la')]
  }

  console.log('streaming')

  //const graph = await app.stream(inputs)
  let config = { configurable: { thread_id: 'conversation-num-1' } }

  const graph = await app.streamEvents(inputs, {
    ...config,
    streamMode: 'values',
    version: 'v1'
  })

  // for await (const event of graph) {
  //   if (event.event === 'on_llm_stream') {
  //     let chunk: ChatGenerationChunk = event.data?.chunk
  //     let msg = chunk.message as AIMessageChunk
  //     if (msg.tool_call_chunks && msg.tool_call_chunks.length > 0) {
  //       console.log(msg.tool_call_chunks)
  //     } else {
  //       console.log(msg.content)
  //     }
  //   }
  // }

  // for await (const output of stream) {
  //   console.log('output', output)
  //   console.log('-----\n')
  // }

  try {
    const aiStream = FetchStream(graph, {
      onStart: async () => {
        console.log('Stream Initializad...')
      },
      onCompletion: async (completion) => {
        console.log('Completion going:', completion)
      },
      onFinal: async (completion) => {
        console.log('Stream completed', completion)
      },
      onToken: async (token) => {
        console.log('Token received', token)
      }
    })

    //testStreamingTextResponse()

    //const aiStream = await simpleStreamExample()

    //console.log('AI Stream:', aiStream)
    //await consumeStream(aiStream) // Consume the stream and log the output
    //return new Response('Oba', { status: 200 })
    return new StreamingTextResponse(aiStream, {})
  } catch (error) {
    console.error('Error Streaming:', error)
    return new Response('Error', { status: 501 })
  }
}
