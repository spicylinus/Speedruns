interface PushResult {
  commitSha: string;
  url: string;
}

export async function pushFileToGitHub(
  filePath: string,
  content: string,
  message: string
): Promise<PushResult> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = "claude/transcript-sharing-system-hxEvv";

  if (!token || !repo) throw new Error("GITHUB_TOKEN and GITHUB_REPO must be set");

  const encoded = Buffer.from(content).toString("base64");
  const apiPath = filePath.startsWith("/") ? filePath.slice(1) : filePath;

  // Get current SHA if file exists
  let sha: string | undefined;
  const getRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${apiPath}?ref=${branch}`,
    { headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github.v3+json" } }
  );
  if (getRes.ok) {
    const data = await getRes.json() as { sha: string };
    sha = data.sha;
  }

  const body: Record<string, string> = {
    message,
    content: encoded,
    branch,
  };
  if (sha) body.sha = sha;

  const putRes = await fetch(
    `https://api.github.com/repos/${repo}/contents/${apiPath}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!putRes.ok) {
    const err = await putRes.text();
    throw new Error(`GitHub push failed: ${err}`);
  }

  const result = await putRes.json() as { commit: { sha: string; html_url: string } };
  return { commitSha: result.commit.sha, url: result.commit.html_url };
}
