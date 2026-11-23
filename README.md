# Student Laptop Finder

A responsive five-page web app that helps students browse laptops, search and filter them,
read the full specifications of one laptop, save favorites, and compare favorites side by side.

The laptop data is loaded from `data/laptops.json` with `fetch()`, so the app must run from a
local server. The scripts are ES modules and the styling uses Tailwind CSS 4.

GitHub repository: <https://github.com/r4g4b/UI_Assignment2>

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home page with live statistics and top picks |
| `laptops.html` | Catalogue with search, filters, sorting and favorites |
| `details.html` | Full details of one laptop, selected with `?id=` |
| `favorites.html` | Saved laptops with total and average price |
| `compare.html` | Side-by-side comparison of two to four favorites |

## Install

```bash
npm install
```

This installs Tailwind CSS 4, the Tailwind CLI and the official forms plugin locally into
`node_modules`. `node_modules` is not included in the submission because it can be recreated
from `package.json` and `package-lock.json`.

## Build the stylesheet

```bash
npm run build
```

To rebuild automatically while editing:

```bash
npm run dev
```

## Run the app

Start a local server in this folder:

```bash
npm start
```

Then open <http://localhost:8000>. Any local server works, such as the VS Code Live Server
extension.

`fetch()` and ES modules do not work when the pages are opened directly with `file://`.

## Laptop data

- `data/laptops.json` holds 22 laptops.
- Every laptop has: `id`, `name`, `brand`, `price`, `category`, `cpu`, `ramGB`, `storageGB`,
  `batteryHours`, `weightKg`, `screenInches`, `image` and `description`.
- Valid categories are `ultrabook`, `gaming`, `2-in-1`, `creator` and `budget`.

## Themes

The header has a theme switch on every page.

- **Battery Saver Mode** uses a light background with green accents.
- **Performance Mode** uses a dark background with an orange accent.

The selected theme is saved in `localStorage` and restored on every page. The small
`theme-init.js` script runs before the page is painted so the saved theme appears without a
flash of the other theme.

## Folder structure

```
laptop_finder_ahmed/
├── index.html
├── laptops.html
├── details.html
├── favorites.html
├── compare.html
├── src/
│   ├── input.css
│   └── js/
│       ├── theme-init.js
│       ├── api.js
│       ├── storage.js
│       ├── ui.js
│       ├── compare.js
│       ├── home.js
│       ├── catalogue.js
│       ├── details.js
│       ├── favorites.js
│       └── comparePage.js
├── data/
│   └── laptops.json
├── dist/output.css
├── assets/
├── package.json
└── README.md
```
