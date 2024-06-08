import 'cheerio'
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings, ChatOpenAI } from '@langchain/openai'
import { pull } from 'langchain/hub'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import dotenv from 'dotenv'
dotenv.config()

async function main() {
  console.log('Basic RAG')

  const loader = new CheerioWebBaseLoader(
    'https://lilianweng.github.io/posts/2023-06-23-agent/'
  )

  const docs = await loader.load()

  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200
  })
  const splits = await textSplitter.splitDocuments(docs)
  const vectorStore = await MemoryVectorStore.fromDocuments(
    splits,
    new OpenAIEmbeddings()
  )

  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever()
  const prompt = await pull<ChatPromptTemplate>('rlm/rag-prompt')
  const llm = new ChatOpenAI({ model: 'gpt-3.5-turbo', temperature: 0 })

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser()
  })

  const retrievedDocs = await retriever.getRelevantDocuments(
    'what is task decomposition'
  )

  await ragChain.invoke({
    question: 'What is task decomposition?',
    context: retrievedDocs
  })
}

main()

// npx ts-node src/lib/rag_models/basics.ts
