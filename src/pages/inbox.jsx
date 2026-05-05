import { useState } from 'react'
import Head from 'next/head'

export default function InboxPage() {
  let [password, setPassword] = useState('')
  let [text, setText] = useState('')
  let [status, setStatus] = useState({ kind: 'idle' })

  async function onSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    setStatus({ kind: 'submitting' })
    try {
      let res = await fetch('/api/inbox', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Inbox-Password': password,
        },
        body: JSON.stringify({ text, source: 'web' }),
      })
      let data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setStatus({
          kind: 'error',
          message: data.error || `HTTP ${res.status}`,
        })
        return
      }
      setStatus({ kind: 'success', commitUrl: data.commitUrl })
      setText('')
    } catch (err) {
      setStatus({ kind: 'error', message: String(err) })
    }
  }

  return (
    <>
      <Head>
        <title>Inbox</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="mb-2 text-2xl font-semibold">Inbox</h1>
        <p className="mb-6 text-sm text-zinc-500">
          Captures append to <code>vivek-vault/00-Inbox/inbox.md</code>.
          Drained during weekly review.
        </p>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Inbox password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            autoComplete="off"
            required
          />
          <textarea
            placeholder="What's the thought?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full rounded border border-zinc-300 p-2 dark:border-zinc-700 dark:bg-zinc-900"
            required
          />
          <button
            type="submit"
            disabled={
              status.kind === 'submitting' || !text.trim() || !password
            }
            className="rounded bg-zinc-900 px-4 py-2 text-white disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900"
          >
            {status.kind === 'submitting' ? 'Sending…' : 'Capture'}
          </button>
        </form>
        {status.kind === 'success' && (
          <p className="mt-4 text-sm text-green-700 dark:text-green-400">
            Captured.{' '}
            <a
              href={status.commitUrl}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              View commit
            </a>
          </p>
        )}
        {status.kind === 'error' && (
          <p className="mt-4 text-sm text-red-700 dark:text-red-400">
            {status.message}
          </p>
        )}
      </main>
    </>
  )
}
