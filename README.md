# Isabelle Zhan, portfolio

My personal site, laid out like a music artist's profile page. Plain HTML, CSS, and JavaScript. No framework and no build step.

```
index.html    page content
styles.css    all styling (colors live in :root at the top)
script.js     project rows, the song player, the About popup
media/        images used by the site (already resized for the web)
```

## Previewing locally

From this folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` by double-clicking mostly works too, but the Spotify player needs the local server.

## Putting it on GitHub Pages

1. On github.com, create a new **public** repository named exactly `isabelleezhan.github.io`. Don't add a README or license (this folder already has one).
2. In a terminal, from this folder:
   ```
   git remote add origin https://github.com/isabelleezhan/isabelleezhan.github.io.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages**, set Source to "Deploy from a branch", branch `main`, folder `/ (root)`, then Save.
4. After a minute or two the site is live at https://isabelleezhan.github.io

Every later change is just:

```
git add -A
git commit -m "describe the change"
git push
```

GitHub Pages redeploys automatically after each push.

## Common edits

**Change the song.** Copy the song's Spotify link (Share → Copy Song Link). In `script.js`, replace the ID in `SONG_URI` with the part of the link after `/track/` and before `?`. In `index.html`, update the song title, artist, and cover image URL in the action row, the Artist pick card, and the player bar.

**Add a project.** Copy one of the `<li class="track">` blocks in the Popular list in `index.html` and change the text, number, images, and link. Put a new screenshot in `media/`, ideally a JPEG around 1200px wide.

**Add your resume.** Drop `resume.pdf` into this folder and uncomment the Resume link in the Say hi section of `index.html`.

**Custom domain (optional).** Buy a domain (Namecheap, Cloudflare, Squarespace Domains), then in the repo's **Settings → Pages → Custom domain** enter it and follow GitHub's DNS instructions.

## Not uploaded

These stay on this computer only (see `.gitignore`):

- `_originals/` full-size copies of every photo, plus unused ones
- `_archive/` the previous lavender version of the site
- `.claude/` local preview config
