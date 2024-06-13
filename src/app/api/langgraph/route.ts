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

function customParser(): (
  event: any
) => { completion: string; token: string } | void {
  // @ts-ignore
  return (event: any) => {
    try {
      if (event.event === 'on_llm_stream') {
        let chunk: ChatGenerationChunk = event.data?.chunk
        let msg = chunk.message as AIMessageChunk
        if (msg.tool_call_chunks && msg.tool_call_chunks.length > 0) {
          // define what to do with tool call chunks
          console.log(msg.tool_call_chunks)
        } else {
          //console.log(msg.content)
          const messageContent = msg.content
          // Return the relevant data for the callbacks
          return messageContent
        }
      }
    } catch (error) {
      console.error('Error parsing chunk:', error)
      // Handle parsing error or invalid chunk format
    }
  }
}

function FetchStream(
  res: IterableReadableStream<StreamEvent>,
  cb?: AIStreamCallbacksAndOptions
): ReadableStream {
  //@ts-ignore
  return AIStream(res, customParser(), cb)
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

  console.log('stream to screen')
  // @ts-ignore
  const aiStream = FetchStream(graph, {
    onStart: () => {
      console.log('Starting...')
    },
    onCompletion: () => {
      console.log('Completed!')
    },
    onFinal: () => {
      console.log('Final!')
    }
  })

  //return new StreamingTextResponse(aiStream, {}, data)

  return new StreamingTextResponse(aiStream)
}
