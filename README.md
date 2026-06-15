# The 90-Day Strategy Builder

The Mavericks onboarding tool. A wizard that educates agents on marketing, discovers their voice and niche, runs an AI research engine, and outputs a personalized 90-day plan with daily checklists and an AI Content Kit.

The Research Engine runs on Claude Sonnet 4.6 through a serverless function, so your API key stays hidden on the server and every agent gets the same premium research.

---

## What is in here

```
strategy-builder/
  api/
    research.js        Serverless function. Holds your API key. Calls Claude Sonnet 4.6 with web search.
  src/
    App.jsx            The full tool (the wizard, plan, AI kit).
    main.jsx           React entry point.
  index.html           Page shell and print styles.
  package.json         Dependencies.
  vite.config.js       Build config.
  .env.example         Shows the one environment variable you need.
  .gitignore
```

The 60-second timeout for the research function is set inside `api/research.js` with `export const maxDuration = 60;`. Vercel auto-detects any file in the `api` folder as a serverless function, so no extra config is needed.

---

## Deploy in 5 steps

### 1. Push to GitHub

Create a new repo on GitHub, then from this folder:

```bash
git init
git add .
git commit -m "Strategy Builder"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/strategy-builder.git
git push -u origin main
```

### 2. Import into Vercel

- Go to vercel.com and sign in with GitHub
- Click "Add New Project"
- Select your strategy-builder repo
- Vercel auto-detects Vite. Leave the build settings as they are.
- Do NOT deploy yet. Add the API key first (next step).

### 3. Add your API key as an environment variable

- In the import screen (or Project Settings > Environment Variables after import)
- Add a variable:
  - Name: `ANTHROPIC_API_KEY`
  - Value: your key from console.anthropic.com (starts with `sk-ant-`)
- Make sure it applies to Production, Preview, and Development
- Save

### 4. Deploy

- Click Deploy
- Vercel builds the site and the serverless function together
- You get a live URL like `https://strategy-builder.vercel.app`

### 5. Embed in GoHighLevel

- In your FAST OS 2.0 course, add the Strategy Builder as a lesson
- Embed the Vercel URL in an iframe, or link to it directly
- Place it AFTER the FAST link setup lessons

That is it. Agents click Run Research, the serverless function calls Claude with your key, the key is never visible in the browser.

---

## How the key stays safe

The browser never sees your API key. When an agent clicks Run Research:

1. The frontend sends the prompt to `/api/research` (your own serverless function)
2. The function adds your `ANTHROPIC_API_KEY` from Vercel's environment and calls Anthropic
3. Only the research result comes back to the browser

An agent can view source all day and never find the key.

---

## The model

The Research Engine uses `claude-sonnet-4-6` (Claude Sonnet 4.6), the current Sonnet model. Web search is enabled so the research pulls real current pain points, subreddits, and Facebook groups instead of training-data knowledge.

To change the model later, edit one line in `api/research.js`:

```js
model: "claude-sonnet-4-6",
```

---

## Cost

Each research run costs roughly $0.05 to $0.15 (a bit higher than before because web search is on). With the 2-generation limit per agent, a 200-agent rollout runs you a few dollars total. The retention payoff dwarfs the cost.

---

## The generation lock

The current 2-generation limit uses browser localStorage. It works for the vast majority of agents but resets if someone clears their cache or uses incognito.

To make it bulletproof, track the count server-side in the same `api/research.js` function, keyed by the agent's GoHighLevel contact ID or email. The function would check the count before calling Anthropic and refuse if the agent already used 2. This is the next upgrade when you are ready.

---

## Local testing (optional)

```bash
npm install
npm run dev
```

Note: the `/api/research` function only runs on Vercel (or with `vercel dev`). For full local testing of the Research Engine, install the Vercel CLI:

```bash
npm i -g vercel
vercel dev
```

Then set `ANTHROPIC_API_KEY` in a local `.env` file (copy `.env.example`).
