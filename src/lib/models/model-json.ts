import { StringOutputParser } from '@langchain/core/output_parsers'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { llmprompts } from './llm-functions'
import { z } from 'zod'
import { chatModel } from './agnostic'
import { Runnable, RunnableConfig } from '@langchain/core/runnables'

const topic = z.object({
  topic: z.string().describe('Topic of the question'),
  sub_topic: z.string().describe('Subtopic of the question'),
  clarifying_question: z
    .string()
    .optional()
    .nullable()
    .describe('Clarifying question'),
  options: z
    .array(
      z.object({
        '1': z.string().optional().nullable(),
        '2': z.string().optional().nullable(),
        '3': z.string().optional().nullable(),
        '4': z.string().optional().nullable(),
        '5': z.string().optional().nullable()
      })
    )
    .optional()
    .nullable()
    .describe('Options for the question'),
  language: z.string().describe('The language of the question')
})

export const model_json = ({ modelName }: { modelName: string }): any => {
  const model = chatModel(modelName)
  // @ts-ignore
  const structuredLlm = model.withStructuredOutput(topic)

  // const structuredLlm = model.withStructuredOutput(topic, {
  //   method: 'jsonMode',
  //   name: 'topic'
  // })

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', `${llmprompts[0].content}  ${llmprompts[13].content}`],
    ['user', '{input}']
  ])
  const outputParser = new StringOutputParser()
  // @ts-ignore
  const llmChain = prompt.pipe(structuredLlm)

  // const answer = await llmChain.invoke({
  //   input: 'explique me o que é IA'
  // })

  return llmChain
}
