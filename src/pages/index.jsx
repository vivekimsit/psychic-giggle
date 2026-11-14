import { useEffect, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'
import { formatDate } from '@/lib/formatDate'
import { generateRssFeed } from '@/lib/generateRssFeed'
import { getAllArticles } from '@/lib/getAllArticles'

const DEATH_PROJECT_URL = 'https://iwasweak.com/death'

const SOCIAL = [
  {
    href: 'https://twitter.com/vivekimsit',
    label: 'Twitter',
    icon: TwitterIcon,
  },
  {
    href: 'https://github.com/vivekimsit',
    label: 'GitHub',
    icon: GitHubIcon,
  },
  {
    href: 'https://www.linkedin.com/in/vivekpoddar',
    label: 'LinkedIn',
    icon: LinkedInIcon,
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: InstagramIcon,
  },
]

function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.5 3.5 11 8l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SectionLabel({ children, className = '' }) {
  return (
    <h2
      className={`text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase dark:text-neutral-500 ${className}`}
    >
      {children}
    </h2>
  )
}

function PulseDot() {
  return (
    <span className="relative flex h-2 w-2" aria-hidden="true">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
    </span>
  )
}

// PixelPortrait — placeholder for a future data-pulsating animation.
// Swap the <Image> for a canvas / WebGL layer when the animation ships.
function PixelPortrait() {
  return (
    <div className="relative h-56 w-56 overflow-hidden bg-neutral-100 ring-1 ring-zinc-900/10 sm:h-64 sm:w-64 dark:bg-neutral-900 dark:ring-white/10">
      <Image
        src={portraitImage}
        alt="Vivek Poddar"
        priority
        sizes="(min-width: 640px) 256px, 224px"
        className="h-full w-full object-cover contrast-125 grayscale"
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}

function Hero() {
  return (
    <section className="flex flex-col items-center text-center">
      <PixelPortrait />
      <h1 className="mt-8 text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-neutral-50">
        Vivek Poddar
      </h1>
      <p className="mt-4 text-sm text-zinc-500 dark:text-neutral-500">
        Existential Technologist / Lead Engineer (ex-Salesforce, Amazon, Google)
      </p>
      <div className="-mx-1 mt-6 flex items-center gap-1">
        {SOCIAL.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            rel="noopener noreferrer"
            target="_blank"
            className="rounded-md p-1.5 transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            <Icon className="h-4 w-4 fill-zinc-500 dark:fill-neutral-400" />
          </Link>
        ))}
      </div>
    </section>
  )
}

function Philosophy() {
  return (
    <section className="mx-auto max-w-2xl text-center">
      <SectionLabel>Philosophy</SectionLabel>
      <blockquote className="mt-6 font-serif text-3xl leading-[1.15] tracking-tight text-zinc-900 sm:text-4xl dark:text-neutral-50">
        <span className="block font-bold">Memento mori.</span>
        <span className="mt-4 block">
          Embrace your end. Make every second count.
        </span>
        <span className="mt-4 block text-2xl text-zinc-500 italic sm:text-3xl dark:text-neutral-500">
          (I was weak)
        </span>
      </blockquote>
      <Link
        href={DEATH_PROJECT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-10 inline-flex items-center gap-2 border border-zinc-400 px-4 py-2.5 text-[11px] font-semibold tracking-[0.2em] text-zinc-900 uppercase transition-colors duration-150 ease-out hover:bg-zinc-900 hover:text-white dark:border-neutral-600 dark:text-neutral-100 dark:hover:border-neutral-100 dark:hover:bg-neutral-100 dark:hover:text-neutral-900"
      >
        Explore the Death Project
        <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </section>
  )
}

function ArticleRow({ article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group -mx-3 flex items-baseline gap-4 rounded-md px-3 py-3 transition-colors duration-150 ease-out hover:bg-neutral-100/50 dark:hover:bg-neutral-900/30"
    >
      <span className="min-w-0 flex-1 truncate text-sm text-zinc-500 transition-colors duration-150 ease-out group-hover:text-zinc-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
        {article.title}
      </span>
      <time
        dateTime={article.date}
        className="flex-none text-xs tabular-nums text-zinc-400 dark:text-neutral-500"
      >
        {formatDate(article.date)}
      </time>
    </Link>
  )
}

function Writing({ articles }) {
  return (
    <section>
      <SectionLabel>Writing</SectionLabel>
      <div className="mt-4 divide-y divide-neutral-200 dark:divide-neutral-800">
        {articles.map((article) => (
          <ArticleRow key={article.slug} article={article} />
        ))}
      </div>
    </section>
  )
}

function UtilityFooter() {
  const [data, setData] = useState(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('https://trakker-app.fly.dev/resources/spotify/now-playing')
      .then((res) => res.json())
      .then((d) => {
        setData(d)
        setLoaded(true)
      })
      .catch(() => setLoaded(true))
  }, [])

  return (
    <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-neutral-500">
      <span className="flex items-center gap-1.5">
        <PulseDot />
        Available for chats
      </span>
      <Link
        href="https://cal.com"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-zinc-700 transition-colors duration-150 ease-out hover:text-zinc-950 dark:text-neutral-300 dark:hover:text-neutral-50"
      >
        Book →
      </Link>
      <span className="ml-auto flex min-w-0 items-center gap-1.5">
        <span className="flex-none text-[10px] font-semibold tracking-[0.15em] text-zinc-400 uppercase dark:text-neutral-600">
          Now
        </span>
        {!loaded ? (
          <span className="text-zinc-400 dark:text-neutral-600">…</span>
        ) : data ? (
          <span className="min-w-0 truncate text-zinc-700 dark:text-neutral-300">
            {data.trackTitle}
          </span>
        ) : (
          <span>Silence</span>
        )}
      </span>
    </div>
  )
}

export default function Home({ articles }) {
  return (
    <>
      <Head>
        <title>Vivek Poddar — Existential Technologist</title>
        <meta
          name="description"
          content="Vivek Poddar — engineer based in India. Memento mori."
        />
      </Head>
      <Container className="mt-12 sm:mt-20">
        <Hero />
      </Container>
      <Container className="mt-20 sm:mt-28">
        <Philosophy />
      </Container>
      <Container className="mt-20 sm:mt-28">
        <Writing articles={articles} />
      </Container>
      <Container className="mt-16 mb-8 sm:mt-24">
        <UtilityFooter />
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRssFeed()
  }

  return {
    props: {
      articles: (await getAllArticles())
        .slice(0, 4)
        .map(({ component, ...meta }) => meta),
    },
  }
}
