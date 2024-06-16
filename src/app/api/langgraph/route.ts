import {
  AIStreamCallbacksAndOptions,
  AIStreamParser,
  AIStreamParserOptions,
  StreamingTextResponse
} from 'ai'
import { stateGraph } from '@/lib/models/state-graph'
import {
  HumanMessage,
  AIMessage,
  SystemMessage
} from '@langchain/core/messages'
import { ChatGenerationChunk } from '@langchain/core/outputs'
import { IterableReadableStream } from '@langchain/core/utils/stream'
import { StreamEvent } from '@langchain/core/dist/tracers/event_stream'

// Set the runtime to edge for best performance
export const runtime = 'edge'

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
        return

      case 'on_llm_stream':
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
          if (messageContent) {
            return { isText: false, content: messageContent }
          }
        }
        return

      case 'on_llm_end':
        console.log('*****************************************')
        console.log('On LLM End', event.data.output.generations[0][0].text)
        return

      default:
        return
    }
  }
}

function FetchStream(
  stream: IterableReadableStream<StreamEvent>,
  cb?: AIStreamCallbacksAndOptions
): ReadableStream<Uint8Array> {
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
          const encoder = new TextEncoder()

          // Format each chunk properly
          const formattedOutput = `0:"${output}"\n`
          const encodedOutput = encoder.encode(formattedOutput)
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

export interface Message {
  role: 'user' | 'assistant'
  content: string
  createdAt: string
  id: string
}

export async function POST(req: Request) {
  const prompt = await req.json() // Assuming modelType is provided in the request

  const { messages, data } = prompt

  const inputMessages = messages.map((message: Message) => {
    if (message.role === 'user') {
      return new HumanMessage(message.content)
    } else if (message.role === 'assistant') {
      return new AIMessage(message.content)
    }
  })

  const app = await stateGraph()

  const inputs = {
    messages: inputMessages
  }

  let config = { configurable: { thread_id: 'conversation-num-1' } }

  const graph = await app.streamEvents(inputs, {
    ...config,
    streamMode: 'values',
    version: 'v1'
  })

  try {
    const aiStream = FetchStream(graph, {
      onStart: async () => {
        console.log('Stream Initializad...')
      },
      onCompletion: async (completion) => {
        //console.log('Completion going:', completion)
      },
      onFinal: async (completion) => {
        console.log('Stream COMPLTETED', completion)
      },
      onToken: async (token) => {
        //console.log('Token received', token)
      }
    })

    return new StreamingTextResponse(aiStream, {})
  } catch (error) {
    console.error('Error Streaming:', error)
    return new Response('Error', { status: 501 })
  }
}
