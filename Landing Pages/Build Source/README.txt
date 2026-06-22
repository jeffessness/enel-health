Enel Health - Landing Pages - Build Source
===========================================

WHAT THIS IS
A single static-site generator that produces the full landing funnel:
27 study pages (Navy / Petrol / Mint  x  peptide / fasting / circadian  x  landing / join / payoff),
13 gated library preview pages, and a hub index. No backend; the signup form is a demo.

FILES
- build_rework.js  The generator. All copy, palettes, and structure live in the
                   STUDIES, PALETTES, and LIBRARIES objects near the top. Edit and re-run.
- assets/          Hero photos (peptide-hero.jpg, fasting-hero.jpg, circadian-hero.jpg)
                   and the 13 rendered library screenshots (libshot-<slug>.png).
- serve.js         Tiny static server for local preview.

BUILD
1. Install Node.js v18 or newer.
2. node build_rework.js out
3. Copy assets into the build:   (mac/linux) cp -r assets out/assets
                                 (windows)   xcopy /E /I assets out\assets
4. Open out/index.html, or run:  node serve.js   then visit http://localhost:5599

RE-RENDER LIBRARY SCREENSHOTS (optional)
Headless Edge/Chrome captures each live library to assets/libshot-<slug>.png, e.g.:
  msedge --headless=new --disable-gpu --window-size=1280,1600 --virtual-time-budget=9000 \
    --screenshot="assets/libshot-peptides.png" "file:///path/to/Peptides.html"

NOTES
- Hero photos are large; compress for production.
- Social sign-on glyphs are simple placeholders; swap official brand SVGs for production.
