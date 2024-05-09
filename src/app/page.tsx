'use client'

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-2xl py-24 mx-auto stretch">
      <h1 className="text-4xl font-bold">Welcome to the AI Chatbot</h1>
      <p className="mt-4">
        This is a simple chatbot that can answer questions and provide
        information. It uses the GPT-3.5 model from OpenAI to generate
        responses.
      </p>
      <p className="mt-4">
        To get started, simply type a message in the input box below and press
        Enter. The chatbot will respond with a generated message.
      </p>
      <p className="mt-4">
        You can also select a different model from the dropdown menu to see how
        the responses differ.
      </p>
    </div>
  )
}
