# QureHeal Marketing Website

Static marketing and SEO website for **QureHeal**.

## Run locally

```bash
python -m http.server 8080
```

Open `http://localhost:8080`.

## Publish to GitHub

```bash
git init
git add .
git commit -m "Initial QureHeal marketing website"
git branch -M main
git remote add origin https://github.com/<your-account>/qureheal-marketing.git
git push -u origin main
```

## Cloudflare Pages

- Framework preset: None
- Build command: leave empty
- Build output directory: /
- Production branch: main


## Website assistant

The website includes a client-side QureHeal assistant that answers common marketing and product questions using predefined JavaScript responses.

It does not send data to an external AI service and does not provide medical advice. To connect it to an AI backend later, replace the `findAnswer()` logic in `assets/js/main.js` with a secure server-side API call.
