# GIREESH G — Portfolio

> Cinematic dark portfolio website built with vanilla HTML, CSS & JavaScript.

![Theme](https://img.shields.io/badge/Theme-Cinematic%20Dark-0B0B0C?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen?style=flat-square)

---

## Overview

A premium, brutalist-minimal portfolio featuring:

- **Deep cinematic black** aesthetic (#0B0B0C)
- **Ultra-bold condensed typography** (Bebas Neue)
- **Smooth scroll animations** with fade-in reveals
- **Custom cursor** with hover glow effects
- **Grain texture overlay** for film-like feel
- **Floating image cards** with parallax
- **Fully responsive** — mobile to ultrawide

---

## Tech Stack

| Layer      | Technology                            |
|------------|---------------------------------------|
| Structure  | Semantic HTML5                        |
| Styling    | CSS3, CSS Variables, CSS Grid/Flexbox |
| Animation  | Vanilla JS, IntersectionObserver      |
| Typography | Bebas Neue, Inter (Google Fonts)      |
| Build      | Zero-config (static files)            |

---

## Project Structure

```
PORTFOLIO/
├── src/                         # App source (served by live-server)
│   ├── index.html
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css
│   │   ├── global.css
│   │   ├── animations.css
│   │   └── components.css
│   ├── js/
│   │   ├── main.js
│   │   ├── animations.js
│   │   └── smoothScroll.js
│   ├── images/                  # All website image/svg assets
│   ├── video/                   # Reel videos
│   └── resume/                  # Downloadable resume PDF
├── public/
│   └── images/                  # Optional static backups/placeholders
├── assets/
│   └── archive/
│       ├── legacy-folders/      # Old folders kept safely
│       └── raw-media/           # Raw design/video files moved from root
├── package.json
└── README.md
```

---

## Quick Start

```bash
# Install dependencies (optional for this static setup)
npm install

# Start dev server (recommended)
npm run dev

# Or start with browser auto-open
npm start
```

---

## Customization

All theme values are in `src/css/variables.css` as CSS custom properties:

```css
--color-bg:           #0B0B0C;
--color-text-primary: #FFFFFF;
--font-hero:          'Bebas Neue';
--font-body:          'Inter';
```

---

## Contact

- **Email:** gireeshgandhinathan@gmail.com
- **Phone:** +91 9500 066 200
- **LinkedIn:** [linkedin.com/in/gireesh-g-402560332](https://www.linkedin.com/in/gireesh-g-402560332)

---

© 2026 Gireesh G. All Rights Reserved.
