import { StreamEvent } from '@langchain/core/dist/tracers/event_stream'
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
          //console.log('event_type: ', event_type)
          if (event_type === 'on_llm_stream') {
            const chunk: ChatGenerationChunk = event.data?.chunk

            controller.enqueue(chunk.text)
          }
        }
      })
    )
    .pipeThrough(createCallbacksTransformer(callbacks))
    .pipeThrough(createStreamDataTransformer())
}
