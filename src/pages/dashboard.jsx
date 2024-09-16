import Head from 'next/head'

import { Container } from '@/components/Container'
import { TopTracks } from '@/components/TopTracks'

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard - Vivek Poddar</title>
        <meta
          name="dashboard"
          content="I listen to a lot of music, and watch a lot of films."
        />
      </Head>
      <Container className="mt-16 sm:mt-32">
        <TopTracks />
      </Container>
    </>
  )
}
