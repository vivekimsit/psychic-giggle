import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

import links from './src/data/links.json' assert { type: 'json' }

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    domains: ['bright-kringle-122bbb.netlify.app'],
  },
  async redirects() {
    return links.map(({ key, value }) => ({
      source: `/${key.toLowerCase().replace(/ /g, '-')}(/)?`,
      destination: value,
      permanent: true,
    }))
    // return [
    //   {
    //     source: '/cal',
    //     destination: 'https://cal.com/vivek-poddar/30min',
    //     permanent: true,
    //   },
    //   {
    //     source: '/roadmaps',
    //     destination: 'https://roadmap.sh',
    //     permanent: true,
    //   },
    //   {
    //     source: '/github',
    //     destination: 'https://github.com/vivekimsit',
    //     permanent: true,
    //   },
    //   {
    //     source: '/resume',
    //     destination:
    //       'https://drive.google.com/file/d/1SGRrQuEpDRzAjbFSWO1TfX7H7LSanng5/view?usp=sharing',
    //     permanent: true,
    //   },
    // ]
  },
  async rewrites() {
    return [
      {
        source: '/relearn/:path*',
        destination: 'https://bright-kringle-122bbb.netlify.app/:path*',
      },
    ]
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypePrism],
  },
})

export default withMDX(nextConfig)
