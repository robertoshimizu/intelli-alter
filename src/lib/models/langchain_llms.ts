import { ChatOpenAI } from '@langchain/openai'
import { ChatAnthropic } from '@langchain/anthropic'
import { ChatGroq } from '@langchain/groq'
import { ChatMistralAI } from '@langchain/mistralai'
import { ChatGoogleGenerativeAI } from '@langchain/google-genai'

// Function to create a model instance based on a parameter
export const chatModel = (modelType: string) => {
  switch (modelType) {
    case 'sonnet':
      return new ChatAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: 'claude-3-sonnet-20240229' // context window 200k
      })
    case 'opus':
      return new ChatAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: 'claude-3-opus-20240229' // context window 200k
      })
    case 'haiku':
      return new ChatAnthropic({
        apiKey: process.env.ANTHROPIC_API_KEY,
        model: 'claude-3-haiku-20240307' // context window 200k
      })
    case 'groq-mixtral-8x7b':
      return new ChatGroq({
        apiKey: process.env.GROQ_API_KEY,
        model: 'mixtral-8x7b-32768' // context window 32k
      })
    case 'gpt-3.5-turbo':
      return new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: 'gpt-3.5-turbo' // context window 16k
      })
    case 'gpt-4-turbo':
      return new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: 'gpt-4-turbo' // context window 128k
      })
    case 'gpt-4o':
      return new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        modelName: 'gpt-4o' // context window 128k
      })
    case 'mistral-large':
      return new ChatMistralAI({
        apiKey: process.env.MISTRALAI_API_KEY,
        model: 'mistral-large-latest' // context window 32k
      })
    case 'mixtral-8x7B':
      return new ChatMistralAI({
        apiKey: process.env.MISTRALAI_API_KEY,
        model: 'open-mixtral-8x7b' // context window 32k
      })
    case 'mixtral-8x22B':
      return new ChatMistralAI({
        apiKey: process.env.MISTRALAI_API_KEY,
        model: 'open-mixtral-8x22b' // context window 64k
      })
    case 'gemini-1.5-pro-latest':
      return new ChatGoogleGenerativeAI({
        model: 'gemini-1.5-pro-latest', // context window 1M
        apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY
      })
    default:
      throw new Error(`Unsupported model type: ${modelType}`)
  }
}
