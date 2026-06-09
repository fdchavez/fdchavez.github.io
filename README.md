# Fredierick Chavez — Portfolio

Personal portfolio site for Fredierick Chavez, Master of Data Science (Monash University),
targeting Business Analyst, Data Analyst, and BI Analyst roles.

**Live site:** https://fdchavez.github.io

## Built with

- HTML, CSS, and vanilla JavaScript (no framework, no build step)
- Responsive layout with light/dark theming via CSS custom properties
- Scroll-reveal animations using `IntersectionObserver`, with `prefers-reduced-motion` respected

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page structure and content |
| `style.css` | Design system, layout, responsiveness |
| `script.js` | Theme toggle, navigation, scroll interactions |

## Running locally

It's a static site, so just open `index.html` in a browser. For a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Featured project

**[MyCyberMate](https://mycybermate.me)** — a scam-awareness web app for older Australians
(Vue + FastAPI + PostgreSQL), built as an industry capstone project.
