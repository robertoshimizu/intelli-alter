import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

import { ChatOpenAI } from '@langchain/openai'
import { JsonOutputFunctionsParser } from 'langchain/output_parsers'
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate
} from '@langchain/core/prompts'
import { llmprompts } from './llm-functions'
import { chatModel } from '../models/agnostic'

const TopicSchema = z
  .object({
    topic: z.string(),
    sub_topic: z.string(),
    clarifying_question: z.string(),
    options: z.array(z.string()),
    language: z.string()
  })
  .describe('Topic Schema')

// <z.infer<typeof TopicSchema>>

const prompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `${llmprompts[0].content}  ${llmprompts[13].content} NOTICE: If input is numeric, you must reflect on the previous last 3 messages and make a conection between the options presented in an ambigous situation, in which claryfying options with repsective sub_topics were given. If so, the answer is confirming its options and you must take this numeric options to output the right sub_topic.`
  ],
  ['user', '{inputText}']
])

const model = chatModel('groq-mixtral-8x7b')

const llm = model

// Binding "function_call" below makes the model always call the specified function.
// If you want to allow the model to call functions selectively, omit it.
const functionCallingModel = llm.bind({
  functions: [
    {
      name: 'output_formatter',
      description: 'Should always be used to properly format output',
      parameters: zodToJsonSchema(TopicSchema)
    }
  ],
  function_call: { name: 'output_formatter' }
})

const outputParser = new JsonOutputFunctionsParser()

export const topicfier = prompt.pipe(functionCallingModel)

// const response = await chain.invoke({
//   inputText: 'chest pain'
// })

// console.log(JSON.stringify(response, null, 2))

// npx ts-node src/langgraph/topicfier.ts
