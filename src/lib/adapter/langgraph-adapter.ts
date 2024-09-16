import { StreamEvent } from '@langchain/core/dist/tracers/event_stream'
import { AIMessageChunk } from '@langchain/core/messages'
import { ChatGenerationChunk } from '@langchain/core/outputs'
import {
  AIStreamCallbacksAndOptions,
  createCallbacksTransformer,
  createStreamDataTransformer
} from 'ai'

type LangGraphImageDetail = 'auto' | 'low' | 'high'

type LangGraphMessageContentText = {
  type: 'text'
  text: string
}

type LangGraphMessageContentImageUrl = {
  type: 'image_url'
  image_url:
    | string
    | {
        url: string
        detail?: LangGraphImageDetail
      }
}

type LangGraphMessageContentComplex =
  | LangGraphMessageContentText
  | LangGraphMessageContentImageUrl
  | (Record<string, any> & {
      type?: 'text' | 'image_url' | string
    })
  | (Record<string, any> & {
      type?: never
    })

type LangGraphMessageContent = string | LangGraphMessageContentComplex[]

type LangGraphAIMessageChunk = {
  content: LangGraphMessageContent
}

/**
Converts LangGraph output streams to AIStream. 

The following streams are supported:
- `LangGraphAIMessageChunk` streams (LangGraph `model.stream` output)
- `string` streams (LangGraph `StringOutputParser` output)
 */
export function toAIStream(
  stream: ReadableStream<StreamEvent> | ReadableStream<string>,
  callbacks?: AIStreamCallbacksAndOptions
) {
  return stream
    .pipeThrough(
      new TransformStream<StreamEvent | any>({
        transform: async (event, controller) => {
          const event_type = event.event
          const tags = event.tags
          const chunkData = event.data

          // Check if event.data has a 'chunk' property
          const chunk: AIMessageChunk = chunkData.chunk || chunkData
          if (!chunk) {
            console.warn('No chunk found in event data')
            return
          }

          if (event_type === 'on_chat_model_stream') {
            //console.log('Chunk:', chunk, '|')

            if (chunk.content) {
              //console.log('Chunk content:', chunk.content, '|')
              controller.enqueue(chunk.content)
            } else {
              //console.log('Chunk content is undefined')
            }
          }
        }
      })
    )
    .pipeThrough(createCallbacksTransformer(callbacks))
    .pipeThrough(createStreamDataTransformer())
}

/**
Converts LangGraph output streams to AIStream. 

The following streams are supported:
- `LangGraphAIMessageChunk` streams (LangGraph `model.stream` output)
- `string` streams (LangGraph `StringOutputParser` output)
 */

// Unique event types: [
//   'on_chain_start',
//   'on_chain_end',
//   'on_chain_stream',
//   'on_chat_model_start',
//   'on_chat_model_stream',
//   'on_chat_model_end'
// ]
// export function toAIStream(
//   stream: ReadableStream<StreamEvent> | ReadableStream<string>,
//   callbacks?: AIStreamCallbacksAndOptions
// ) {
//   //const uniqueEventTypes = new Set<string>()
//   return stream
//     .pipeThrough(
//       new TransformStream<StreamEvent | any>({
//         transform: async (event, controller) => {
//           const event_type = event.event
//           const tags = event.tags

//           if (
//             event_type === 'on_chat_model_stream' &&
//             tags.includes('final_node')
//           ) {
//             const chunk: LangGraphAIMessageChunk = event.data

//             //controller.enqueue(chunk.content)
//             console.log(chunk.content, '|')
//           }
//         }
//       })
//     )
//     .pipeThrough(createCallbacksTransformer(callbacks))
//     .pipeThrough(createStreamDataTransformer())
// }
