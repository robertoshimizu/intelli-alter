'use client'
import Image from 'next/image'
import { useChat } from 'ai/react'

type Message = {
  id: number
  role: 'user' | 'ai'
  content: string
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  })

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>

      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>
      <article className="mt-16 text-center lg:mt-32 lg:text-left">
        <h1 className="text-2xl font-bold">
          RCT – 2ry analysis | Aerobic exercise intervention shows potential to
          reduce chemotherapy-induced peripheral neuropathy
        </h1>
        <p>
          <a href="https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2807806">
            Effect of Exercise on Chemotherapy-Induced Peripheral Neuropathy
            Among Patients Treated for Ovarian Cancer: A Secondary Analysis of a
            Randomized Clinical Trial – JAMA Network Open
          </a>
        </p>{' '}
        <p>
          <strong>See also:</strong>{' '}
          <a href="https://cdn.jamanetwork.com/ama/content_public/journal/jamanetworkopen/939195/zoi230766va_1689968934.27856.png?Expires=1694306789&amp;Signature=ej0phs-hv0nj6U9nQH0IIvKoRbW3eF6vkP2lKp80Xl8QN5-rjrrMf9Ijw8MgH0HsXXDxqOuLMjeMi2JPvY2HOoZKH29g2Pu1gWoCWpdIqwOKSoZ4nvTNTmjfnl8IRh29s0R9YOfLKRmLE5sH5BClI2AZlLbEYn2tmBOjCFLDqnH1p4nD9zvKR2TM2arscWZekNXuFBuS~hzvWPPF~xUjzKaT2TLxoRsfdD4uMKBnyN-BkX136VngoWrXDuXo0zpi2S-fvfkSmqowsh~-DTFAwJdOn6NPYeo5J0890sNi3pAHi9CzygGeg-HScPiXK-1WA9oA~zychHWcy~hkLvlzvg__&amp;Key-Pair-Id=APKAIE5G5CRDK6RD3PGA">
            Visual Abstract
          </a>
        </p>{' '}
        <p>
          <strong>Commentary:</strong>{' '}
          <a href="https://consumer.healthday.com/physician-s-briefing-neuropathy-2662625877.html">
            Aerobic Exercise Cuts Chemotherapy-Induced Peripheral Neuropathy
            Symptoms &#8211; HealthDay
          </a>
        </p>{' '}
        <p>&nbsp;</p>{' '}
        <p>
          <strong>Commentary on Twitter</strong>
        </p>{' '}
        <blockquote className="twitter-tweet" data-width="500" data-dnt="true">
          {' '}
          <p lang="en" dir="ltr">
            Aerobic exercise improves chemotherapy-induced peripheral neuropathy
            (CIPN) in women who were treated for ovarian cancer. Incorporating
            referral to exercise programs as a part of standard of oncology care
            is recommended.{' '}
            <a href="https://t.co/lp9C9seyM6">https://t.co/lp9C9seyM6</a>{' '}
            <a href="https://twitter.com/anlan_cao?ref_src=twsrc%5Etfw">
              @anlan_cao
            </a>
          </p>{' '}
          <p>
            &mdash; JAMA Network Open (@JAMANetworkOpen){' '}
            <a href="https://twitter.com/JAMANetworkOpen/status/1686406434223792128?ref_src=twsrc%5Etfw">
              August 1, 2023
            </a>
          </p>
        </blockquote>{' '}
        <p>
          <script
            async
            src="https://platform.twitter.com/widgets.js"
            charSet="utf-8"
          ></script>
        </p>{' '}
        <p>&nbsp;</p>{' '}
        <p>
          The post{' '}
          <a
            rel="nofollow"
            href="https://www.linksmedicus.com/news/rct-2ry-analysis-aerobic-exercise-intervention-shows-potential-reduce-chemotherapy-induced-peripheral-neuropathy/"
          >
            RCT – 2ry analysis | Aerobic exercise intervention shows potential
            to reduce chemotherapy-induced peripheral neuropathy
          </a>{' '}
          appeared first on{' '}
          <a rel="nofollow" href="https://www.linksmedicus.com">
            Links Medicus
          </a>
          .
        </p>
      </article>

      <section>
        <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
          {messages.length > 0
            ? messages.map((m) => (
                <div key={m.id} className="whitespace-pre-wrap">
                  {m.role === 'user' ? 'User: ' : 'AI: '}
                  {m.content}
                </div>
              ))
            : null}

          <form onSubmit={handleSubmit}>
            <input
              className="fixed w-full max-w-2xl bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
              value={input}
              placeholder="O que você quer saber sobre este artigo?"
              onChange={handleInputChange}
            />
          </form>
        </div>
      </section>
    </main>
  )
}
