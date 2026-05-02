import nextMDX from '@next/mdx'

import links from './src/data/links.json' with { type: 'json' }

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx'],
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bright-kringle-122bbb.netlify.app',
      },
    ],
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
    remarkPlugins: [['remark-gfm']],
    rehypePlugins: [['@mapbox/rehype-prism']],
  },
})

export default withMDX(nextConfig)
