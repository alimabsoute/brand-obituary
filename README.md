# Brand Obituary

Fully sourced post-mortems of failed companies and brands, published as a small static site.

- `/` — index of post-mortems with tier (Dead / Ghost) and category filters
- `/pets-com/` — Pets.com (Dead)
- `/webvan/` — Webvan (Dead)
- `/radioshack/` — RadioShack (Ghost)

## Structure

Plain static HTML. Shared styles live in `assets/site.css` and the shared page runtime (story stage, Wayback tabs, chart helpers, d3 maps with rough.js annotations) in `assets/core.js`. Each post-mortem has its own `index.html` and `page.js`.

Third-party libraries load from jsDelivr: Chart.js 4.4.1, rough.js 4.6.6, d3 7.9.0, topojson-client 3.1.0 and the us-atlas state boundaries. Fonts: Source Serif 4, Inter and Caveat from Google Fonts.

Archived websites are shown as live, script-disabled views of Internet Archive captures (`web.archive.org/web/<timestamp>if_/<url>`).

## Data honesty

Every figure links to a numbered source on its page. SEC filings are cited by accession number. Derived numbers, estimates and unverified claims are labeled in the text and summarized in each page's data notes. Homage sections are original recreations, not reproductions of logos or trademarks.

## Adding a company

1. Copy an existing page folder, e.g. `cp -r webvan newco`, and edit `newco/index.html` (sections, tables, source list) and `newco/page.js` (chart data, map pins and notes). Keep the section skeleton: context, story, old website, unit economics, marketing, money, map, rivals, timeline, people, press, cause of death, what-if, homage, afterlife, sources.
2. Reuse the shared building blocks in `assets/core.js` (charts, Wayback tabs, story stage, pastel pins with rough.js notes) and the classes in `assets/site.css`. Don't add italics, gradients or emoji. Figures are auto-numbered, and every map needs a title, a "What this map shows" note, a legend and a key.
3. Every number needs a numbered source (`<sup class="fn"><a href="#src-N">N</a></sup>`). Label derived figures, estimates and unverified claims, and list them in the page's data notes.
4. Add a card for it to `index.html` with its tier (`data-tier="dead"` or `"ghost"`) and category (`data-cat` = `consumer`, `dotcom`, `film`, `games` or `restaurants`), and add a link in the site nav on each page.
5. Add the folder's files to the loop in `build.sh`. Commit small files directly; files that are too big for your tooling can be split into `_parts/` with `split -C 18500 -d -a 2 file _parts/<path with / as _>.`.
6. Run `sh build.sh && npx serve dist` and check the page, then push to `main`.

## Build and deploy

The larger pages are stored in `_parts/` as line-split chunks, because the repo was populated through an API with a per-request size limit. `build.sh` copies the site into `dist/` and concatenates those chunks back into the full files (`cat _parts/webvan_index.html.* > dist/webvan/index.html`, and so on). If a full file exists at its real path, it is used instead.

Run locally with `sh build.sh && npx serve dist`.

The repo is imported into Vercel (`vercel.json` sets `buildCommand: sh build.sh` and `outputDirectory: dist`). Every push to `main` deploys.

Clone: `git clone https://github.com/alimabsoute/brand-obituary.git`. Live: https://brand-obituary.vercel.app/
