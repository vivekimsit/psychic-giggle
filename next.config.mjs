import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrism from '@mapbox/rehype-prism'

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
    return [
      {
        source: '/cal',
        destination: 'https://cal.com/vivek-poddar/30min',
        permanent: true,
      },
      {
        source: '/roadmaps',
        destination: 'https://roadmap.sh',
        permanent: true,
      },
      {
        source: '/resume',
        destination:
          'https://drive.google.com/file/d/0ByYl6uQ2fXrReks3dXkzWW9CcTg/view?resourcekey=0-iTel91Y_OYVEZgd3cg_NKw',
        permanent: true,
      },
    ]
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
