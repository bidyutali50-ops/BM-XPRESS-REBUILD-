# Push to BM-XPRESS-REBUILD-

Remote is already configured. The repo is empty, so this is a clean first push.

```bash
unzip bmx-landing.zip
cd bmx
git push -u origin main
```

That's it. Git will prompt for your GitHub username and a **personal access
token** (not your password — GitHub stopped accepting passwords over HTTPS).
Create one at Settings → Developer settings → Personal access tokens →
Fine-grained tokens, scoped to this repo with `Contents: read and write`.

If you use SSH keys instead:

```bash
git remote set-url origin git@github.com:bidyutali50-ops/BM-XPRESS-REBUILD-.git
git push -u origin main
```

## The commits are authored as

```
Bidyut Ali <bidyut@bmxpress.in>
```

I guessed the email. To correct it before pushing:

```bash
git config user.email "your@real.email"
git commit --amend --reset-author --no-edit
```

## This is a standalone folder, not a Next.js app yet

The zip contains `app/`, `components/`, and `lib/` only — no `package.json`,
no `tsconfig.json`. It will push fine, but it will not build until you either:

**Merge it into your existing marketing site** (the one on
`bmxpress-push.vercel.app`) — this is what I would do, since that project
already has the config, the alias, and the Vercel connection:

```bash
cd path/to/bmxpress-push
git checkout -b feat/landing-gsap
cp -r path/to/bmx/app path/to/bmx/components path/to/bmx/lib .
npm i gsap @gsap/react
npm run build
git add -A && git commit -m "feat(landing): rebuild landing page with GSAP"
git push -u origin feat/landing-gsap
```

**Or scaffold a fresh app around it** in the new repo:

```bash
npx create-next-app@latest tmp --ts --tailwind --app --no-src-dir --import-alias "@/*"
cp -r tmp/{package.json,tsconfig.json,next.config.ts,postcss.config.mjs} .
rm -rf tmp
npm i && npm i gsap @gsap/react
npm run build
```

Keep the `@/*` import alias — every component imports `@/lib/gsap`.

## Before it goes live

- [ ] Real contact email and phone in `components/FinalCTA.tsx`
- [ ] Tailwind v4 assumed (`@theme` lives in `app/globals.css`)
