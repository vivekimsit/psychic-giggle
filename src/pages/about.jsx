import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/components/SocialIcons'
import portraitImage from '@/images/portrait.jpg'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

function MailIcon(props) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}

export default function About() {
  return (
    <>
      <Head>
        <title>About - Vivek Poddar</title>
        <meta
          name="description"
          content="I’m Vivek Poddar. I live in India, where I design the future."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              I’m Vivek Poddar. I live in India, where I am shaping the digital
              future.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-600 dark:text-zinc-400">
              <p>
                Hey there! I{"'"}m Vivek Poddar, your friendly neighborhood
                techie currently making magic happen at Salesforce in sunny
                Gurugram, India. While I may not be Spiderman, I do spend my
                days spinning webs of a different kind, mastering the art of
                full-stack web development and agile application design.
              </p>

              <p>
                My tech journey started at Google - yes, the Google - and boy,
                did I learn a thing or two there. From a newbie working on
                Specialist Tools to becoming a Senior Software Engineer, I
                helped build some pretty cool applications for our internal
                teams.
              </p>

              <p>
                Next stop, the European Bioinformatics Institute (EMBL-EBI) in
                Cambridge, UK. Imagine a mix of Sherlock Holmes and Tony Stark -
                using my problem-solving skills and tech savviness, I was all
                about designing and architecting agile applications.
              </p>

              <p>
                Fast forward a bit, and I found myself at Amazon, where I
                continued to level up my skills as a Software Development
                Engineer.
              </p>

              <p>
                Today, you{"'"}ll find me at Salesforce, leading as a Member of
                Technical Staff. From navigating complex code to brainstorming
                the next big thing in tech, there{"'"}s never a dull moment.
              </p>

              <p>
                When I{"'"}m not living my tech life, I{"'"}m here on this blog,
                sharing my experiences and hopefully making the world of tech a
                bit less daunting and a lot more fun for you. If you{"'"}ve ever
                wondered what the life of a software engineer looks like or you
                {"'"}re curious about the latest in tech trends, you{"'"}ve come
                to the right place.
              </p>

              <p>
                So grab a cup of coffee, sit back, and enjoy the ride. Feel free
                to drop a comment, ask a question, or just say hello. Here{"'"}s
                to our tech journey together! Cheers!
              </p>

              <i className="mt-8 block text-sm">
                Disclaimer: The opinions and views expressed in my posts are my
                own and do not necessarily represent those of my employer.
              </i>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink
                href="https://twitter.com/vivekimsit"
                icon={TwitterIcon}
              >
                Follow on Twitter
              </SocialLink>
              <SocialLink
                href="https://instagram.com"
                icon={InstagramIcon}
                className="mt-4"
              >
                Follow on Instagram
              </SocialLink>
              <SocialLink
                href="https://github.com/vivekimsit"
                icon={GitHubIcon}
                className="mt-4"
              >
                Follow on GitHub
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/vivekpoddar"
                icon={LinkedInIcon}
                className="mt-4"
              >
                Follow on LinkedIn
              </SocialLink>
              {/* <SocialLink
								href="mailto:spencer@planetaria.tech"
								icon={MailIcon}
								className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
							>
								spencer@planetaria.tech
							</SocialLink> */}
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}
