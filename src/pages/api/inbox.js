import { Octokit } from '@octokit/rest'
import { Buffer } from 'buffer'
import { timingSafeEqual } from 'crypto'

import { appendToInbox } from '@/lib/vault-inbox'

const MAX_TEXT_BYTES = 8 * 1024
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 20

let hits = new Map()

function rateLimit(ip) {
  let now = Date.now()
  let cutoff = now - RATE_LIMIT_WINDOW_MS
  let arr = (hits.get(ip) || []).filter((t) => t >= cutoff)
  if (arr.length >= RATE_LIMIT_MAX) {
    hits.set(ip, arr)
    return false
  }
  arr.push(now)
  hits.set(ip, arr)
  return true
}

function checkPassword(provided, expected) {
  if (typeof provided !== 'string' || !expected) return false
  let a = Buffer.from(provided)
  let b = Buffer.from(expected)
  if (a.length !== b.length) return false
  return timingSafeEqual(a, b)
}

function checkSameOrigin(req) {
  let origin = req.headers.origin || req.headers.referer || ''
  if (process.env.NODE_ENV !== 'production') {
    if (origin.startsWith('http://localhost')) return true
  }
  let allowed = process.env.NEXT_PUBLIC_SITE_URL || ''
  if (!allowed) return true
  return origin.startsWith(allowed)
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!checkSameOrigin(req)) {
    return res.status(403).json({ error: 'Forbidden origin' })
  }

  let ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  if (!rateLimit(ip)) {
    return res.status(429).json({ error: 'Rate limit exceeded' })
  }

  let provided = req.headers['x-inbox-password']
  if (!checkPassword(provided, process.env.INBOX_PASSWORD)) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  let { text, source = 'web' } = req.body || {}
  if (typeof text !== 'string' || !text.trim()) {
    return res.status(400).json({ error: 'Empty text' })
  }
  if (Buffer.byteLength(text, 'utf8') > MAX_TEXT_BYTES) {
    return res.status(413).json({ error: 'Text too large' })
  }
  if (typeof source !== 'string' || source.length > 32) {
    return res.status(400).json({ error: 'Invalid source' })
  }

  let repoFull = process.env.VAULT_REPO || ''
  let [owner, repo] = repoFull.split('/')
  let path = process.env.VAULT_INBOX_PATH || '00-Inbox/inbox.md'
  if (!owner || !repo || !process.env.GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  try {
    let octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })
    let { commitSha, commitUrl } = await appendToInbox({
      octokit,
      owner,
      repo,
      path,
      text,
      source,
    })
    return res.status(200).json({ ok: true, commitSha, commitUrl })
  } catch (err) {
    console.error('inbox api error', err)
    return res.status(502).json({ error: 'Vault commit failed' })
  }
}
