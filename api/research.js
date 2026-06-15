// Vercel Serverless Function
// Holds your Anthropic API key server-side so agents never see it.
// The key is read from the ANTHROPIC_API_KEY environment variable you set in Vercel.

// Give the function up to 60 seconds (web search research takes longer than a plain call)
export const maxDuration = 60;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is not configured. ANTHROPIC_API_KEY is missing." });
  }

  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: "Missing prompt." });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",
            max_uses: 5,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(502).json({ error: data.error.message || "Anthropic API error" });
    }

    return res.status(200).json({ content: data.content });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown server error" });
  }
}
