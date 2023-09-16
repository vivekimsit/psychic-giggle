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
