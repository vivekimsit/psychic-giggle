import { Buffer } from 'buffer'

export async function appendToInbox({
  octokit,
  owner,
  repo,
  path,
  text,
  source,
  timestamp = new Date().toISOString(),
  branch,
}) {
  let { data: file } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ...(branch ? { ref: branch } : {}),
  })

  if (Array.isArray(file) || file.type !== 'file') {
    throw new Error(`Inbox path is not a file: ${path}`)
  }

  let current = Buffer.from(file.content, 'base64').toString('utf8')
  let block = `\n## ${timestamp} [source: ${source}]\n${text.trim()}\n---\n`
  let updated = current.endsWith('\n') ? current + block : current + '\n' + block

  let result = await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: `inbox: capture ${timestamp}`,
    content: Buffer.from(updated, 'utf8').toString('base64'),
    sha: file.sha,
    ...(branch ? { branch } : {}),
  })

  return {
    commitSha: result.data.commit.sha,
    commitUrl: result.data.commit.html_url,
  }
}
