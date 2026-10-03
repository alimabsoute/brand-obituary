# Brand Obituary

Fully sourced post-mortems of failed companies and brands, published as a small static site.

- `/` — index of post-mortems with tier (Dead / Ghost) and category filters
- `/pets-com/` — Pets.com (Dead)
- `/webvan/` — Webvan (Dead)
- `/radioshack/` — RadioShack (Ghost)

## Structure

Plain static HTML, no build step. Shared styles live in `assets/site.css` and the shared page runtime (story stage, Wayback tabs, chart helpers, d3 maps with rough.js annotations) in `assets/core.js`. Each post-mortem has its own `index.html` and `page.js`.

Third-party libraries load from jsDelivr: Chart.js 4.4.1, rough.js 4.6.6, d3 7.9.0, topojson-client 3.1.0 and the us-atlas state boundaries. Fonts: Source Serif 4, Inter and Caveat from Google Fonts.

Archived websites are shown as live, script-disabled views of Internet Archive captures (`web.archive.org/web/<timestamp>if_/<url>`).

## Data honesty

Every figure links to a numbered source on its page. SEC filings are cited by accession number. Derived numbers, estimates and unverified claims are labeled in the text and summarized in each page's data notes. Homage sections are original recreations, not reproductions of logos or trademarks.

## Deploy

Imported into Vercel as a static project. Every push to `main` deploys.
