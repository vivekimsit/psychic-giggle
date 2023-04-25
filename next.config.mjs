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
    ]
  },
  async rewrites() {
    return {
      fallback: [
        {
          source: '/relearn/:path*',
          destination: 'https://sys-design-course.vercel.app/:path*',
        },
      ],
    }
    // return [
    //   {
    //     source: '/relearn/:path*',
    //     destination: 'https://sys-design-course.vercel.app/:path*',
    //   },
    // ]
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
