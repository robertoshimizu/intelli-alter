'use client'
import Image from 'next/image'
import { useChat } from 'ai/react'
import { TitleLogoLight } from './components/ui/logos'

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
    <main className="flex min-h-screen flex-col items-center justify-between py-1 px-2">
      <div className="mx-auto py-2">
        <TitleLogoLight width={200} />
      </div>

      <article className="mt-8 text-center lg:mt-32 lg:text-left">
        <h1 className="text-lg font-bold">
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
        <div className="w-full max-w-md sm:max-w-2xl  py-12 flex flex-col stretch ">
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
              className="fixed inset-x-0 bottom-0 mx-1 w-full max-w-md sm:max-w-2xl 
              border border-gray-300 rounded mb-8 shadow-xl p-2 text-black"
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
