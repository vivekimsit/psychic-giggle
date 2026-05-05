import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'

function MicIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 4a3 3 0 016 0v6a3 3 0 11-6 0V4z" />
      <path d="M5.5 9.643a.75.75 0 00-1.5 0V10c0 3.06 2.29 5.585 5.25 5.954V17.5h-1.5a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5h-1.5v-1.546A6.001 6.001 0 0016 10v-.357a.75.75 0 00-1.5 0V10a4.5 4.5 0 01-9 0v-.357z" />
    </svg>
  )
}

export default function InboxPage() {
  let [password, setPassword] = useState('')
  let [text, setText] = useState('')
  let [status, setStatus] = useState({ kind: 'idle' })
  let [listening, setListening] = useState(false)
  let [speechSupported, setSpeechSupported] = useState(false)
  let recognitionRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) return
    let r = new SR()
    r.continuous = true
    r.interimResults = false
    r.lang = 'en-US'
    r.onresult = (event) => {
      let chunk = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          chunk += event.results[i][0].transcript
        }
      }
      if (chunk) {
        setText((t) => (t ? t.replace(/\s*$/, '') + ' ' : '') + chunk.trim())
      }
    }
    r.onend = () => setListening(false)
    r.onerror = () => setListening(false)
    recognitionRef.current = r
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpeechSupported(true)
    return () => {
      try {
        r.stop()
      } catch {}
    }
  }, [])

  function toggleMic() {
    let r = recognitionRef.current
    if (!r) return
    if (listening) {
      try {
        r.stop()
      } catch {}
      setListening(false)
    } else {
      try {
        r.start()
        setListening(true)
      } catch {}
    }
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!text.trim()) return
    if (listening) {
      try {
        recognitionRef.current?.stop()
      } catch {}
      setListening(false)
    }
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
          Captures append to <code>vivek-vault/00-Inbox/inbox.md</code>. Drained
          during weekly review.
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
          <div className="relative">
            <textarea
              placeholder="What's the thought?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={8}
              className="w-full rounded border border-zinc-300 p-2 pr-12 dark:border-zinc-700 dark:bg-zinc-900"
              required
            />
            {speechSupported && (
              <button
                type="button"
                onClick={toggleMic}
                aria-label={listening ? 'Stop dictation' : 'Start dictation'}
                aria-pressed={listening}
                className={
                  'absolute top-2 right-2 rounded p-2 transition ' +
                  (listening
                    ? 'bg-red-600 text-white animate-pulse'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700')
                }
              >
                <MicIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          {speechSupported && (
            <p className="text-xs text-zinc-500">
              {listening
                ? 'Listening… click the mic to stop.'
                : 'Click the mic to dictate. On iOS, the keyboard mic also works.'}
            </p>
          )}
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
