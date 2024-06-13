import 'cheerio'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { Document } from '@langchain/core/documents'
import { Pack, pack } from '../../data/pack'
import dotenv from 'dotenv'
import { chatModel } from '../models/langchain_llms'
dotenv.config()

async function main() {
  console.log('Basic RAG')

  // Load the document

  const pack_docs = pack.map((item: Pack) => {
    return new Document({
      pageContent: item.conteudo,
      metadata: {
        titulo: item.titulo,
        pagina: item.pagina
      }
    })
  })

  const vectorStore = await MemoryVectorStore.fromDocuments(
    pack_docs,
    new OpenAIEmbeddings()
  )

  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever()

  const prompt = ChatPromptTemplate.fromMessages([
    'system',
    `You are an medical assistant for doctors that perform primary care via telemedicine. Use the following pieces of retrieved context to answer the question. If you don't know the answer, just say that you don't know. 
     Seja o mais detalhado possivel e apresente opcoes para explorar de acordo com o estado do paciente e suas caracteristicas (por exemplo idoso, crianca, ou gestante, ou indigena, 
     ou com comorbidades, doencas cronicas ou alergias, etc) 
     e opcoes alternativas em caso de nao haver melhora. Se houver preucacoes adicionais ou contraindicacoes, por favor, mencione. 
     Your goal is to provide the most compreensive guideline so doctors can be more precise and resolutive in their care.
     At the end, provide a section References with the sources of the information. For example: source: Pack: Doença pulmonar obstrutiva crônica (DPOC): cuidados de rotina, pagina 127.
     Context: {context}`,
    'user',
    `{question}`
  ])
  //const prompt = await pull<ChatPromptTemplate>('rlm/rag-prompt')

  const llm: any = chatModel('gpt-4o')
  //const llm = new ChatOpenAI({ model: 'gpt-3.5-turbo', temperature: 0 })

  const ragChain = await createStuffDocumentsChain({
    llm,
    prompt,
    outputParser: new StringOutputParser()
  })

  const retrievedDocs = await retriever.invoke('paciente com asma')

  const responde = await ragChain.invoke({
    question:
      'Qual o tratamento para paciente com asma? Seja o mais detalhado possivel e apresente opcoes para explorar de acordo com o estado do paciente e suas caracteristicas (por exemplo idoso, crianca, ou gestante, ou indigena, ou com comorbidades, doencas cronicas ou alergias, etc) e opcoes alternativas em caso de nao haver melhora. Se houver preucacoes adicionais ou contraindicacoes, por favor, mencione.',
    context: retrievedDocs
  })

  console.log(responde)
}

main()

// npx ts-node src/lib/rag_models/basics.ts
