import {
  AIStream,
  AIStreamCallbacksAndOptions,
  AIStreamParser,
  AIStreamParserOptions,
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

async function readStream(reader: ReadableStreamDefaultReader<string>) {
  let result = await reader.read()
  while (!result.done) {
    console.log('Read:', result.value)
    result = await reader.read()
  }
}

function customParser(): AIStreamParser {
  return (data: string, options: AIStreamParserOptions) => {
    let event: StreamEvent
    try {
      event = JSON.parse(data)
    } catch (error) {
      console.error('Error parsing data:', error)
      return
    }

    switch (event.event) {
      case 'on_llm_start':
        console.log('*****************************************')
        console.log('On LLM Start')
        return { isText: false, content: '' }

      case 'on_llm_stream':
        console.log('on_llm_stream event:')
        const chunk: ChatGenerationChunk = event.data?.chunk
        if (!chunk) {
          console.error('Chunk is undefined or null:', event.data)
          return
        }
        // @ts-ignore
        const msg = chunk.message.kwargs as any

        if (msg.tool_call_chunks && msg.tool_call_chunks.length > 0) {
          console.log('******************* TOOLs **********************')
          console.log('Tool call chunks:', msg.tool_call_chunks)
        } else {
          const messageContent = msg.content
          console.log('******************* KATZO **********************')
          // console.log('Message content:', messageContent)
          return { isText: false, content: messageContent }
        }
        return

      case 'on_llm_end':
        console.log('*****************************************')
        console.log('On LLM End', event.data.output.generations[0][0].text)
        return {
          isText: false,
          content: event.data.output.generations[0][0].text
        }

      default:
        console.log('*****************************************')
        console.error('Event:', event.event)
        return
    }
  }
}

function FetchStream(
  stream: IterableReadableStream<StreamEvent>,
  cb?: AIStreamCallbacksAndOptions
): ReadableStream<Uint8Array> {
  // Change the stream type to Uint8Array for better handling of binary data
  const parser = customParser()

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      await cb?.onStart?.()
      console.log('Stream started')

      let final = ''

      for await (const event of stream) {
        const parsed = parser(JSON.stringify(event), { event: event.event })
        if (parsed && typeof parsed !== 'string' && !parsed.isText) {
          const output = parsed.content
          console.log('Enqueuing:', output)
          const encoder = new TextEncoder()
          const encodedOutput = encoder.encode(output)
          controller.enqueue(encodedOutput)
          await cb?.onCompletion?.(output)
          await cb?.onToken?.(output)
          final = output
        }
      }

      controller.close()
      await cb?.onFinal?.(final)
    },
    cancel() {
      cb?.onFinal?.('final')
    }
  })
}

// Assuming you have a function to consume the streaming response in the UI
async function consumeStream(response: StreamingTextResponse) {
  const reader = response.body?.getReader()
  const decoder = new TextDecoder()
  while (true) {
    const { value, done } = (await reader?.read()) || {}
    if (done) break
    if (value) {
      const chunk = decoder.decode(value)
      console.log('Chunk from stream:', chunk)
      // Here you can update the UI with the received chunk
    }
  }
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

// async function consumeStream(stream: ReadableStream<any>) {
//   if (!stream || typeof stream.getReader !== 'function') {
//     console.error('Provided stream is not a ReadableStream:', stream)
//     return
//   }

//   const reader = stream.getReader()
//   const decoder = new TextDecoder()

//   while (true) {
//     const { done, value } = await reader?.read()
//     if (done) {
//       console.log('Stream reading done.')
//       break
//     }
//     console.log('Received chunk:', decoder.decode(value))
//   }
// }

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
    messages: [new HumanMessage('what is the weather in new york?')]
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
        console.log('Stream COMPLTETED', completion)
      },
      onToken: async (token) => {
        console.log('Token received', token)
      }
    })

    //const reader = aiStream.getReader()

    //readStream(reader)

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
