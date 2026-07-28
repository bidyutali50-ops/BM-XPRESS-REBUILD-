# Getting this into GitHub

These files are a drop-in for your existing marketing site repo (the one
deploying to `bmxpress-push.vercel.app` on `main`). Recommended: land it on a
branch so Vercel gives you a preview URL before it touches production.

## Option A — into your existing repo (recommended)

From your local clone of the marketing site:

```bash
git checkout main
git pull
git checkout -b feat/landing-gsap

# copy the extracted files in, overwriting app/ and adding components/ + lib/
cp -r ~/Downloads/bmx-landing/app        .
cp -r ~/Downloads/bmx-landing/components .
cp -r ~/Downloads/bmx-landing/lib        .

npm i gsap @gsap/react
npm run build          # confirm it compiles before pushing

git add -A
git commit -m "feat(landing): rebuild landing page with GSAP lifecycle rail"
git push -u origin feat/landing-gsap
```

Vercel builds a preview for the branch automatically. Open the PR, check the
preview, then merge to `main`.

## Option B — brand new repo

```bash
cd bmx-landing
git init -b main
git add -A
git commit -m "feat(landing): rebuild landing page with GSAP"
gh repo create bmxpress-landing --private --source=. --push
```

Without the `gh` CLI, create the empty repo on github.com first, then:

```bash
git remote add origin git@github.com:<you>/bmxpress-landing.git
git push -u origin main
```

## Option C — the bundle

`bmx-landing.bundle` carries the full commit history in one file:

```bash
git clone bmx-landing.bundle bmxpress-landing
cd bmxpress-landing
git remote set-url origin git@github.com:<you>/bmxpress-landing.git
git push -u origin main
```

## Before you merge

- [ ] `npm i gsap @gsap/react` — the build fails without both
- [ ] Confirm you are on Tailwind v4. If v3, move the `@theme` block out of
      `app/globals.css` into `tailwind.config.ts` under `theme.extend`
- [ ] Real contact email and phone in `components/FinalCTA.tsx`
- [ ] Check the `@/` path alias resolves (`tsconfig.json` → `paths`)
