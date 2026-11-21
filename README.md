# Student Laptop Finder

A responsive five-page web app that helps students browse laptops, search and filter them,
read the full specifications of one laptop, save favorites, and compare favorites side by side.

All laptop data is loaded with JavaScript from `data/laptops.json`, and all styling uses
Tailwind CSS 4.

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

## Build the CSS

```bash
npm run build
```

This writes the compiled stylesheet to `dist/output.css`.

To rebuild on every change while working:

```bash
npm run dev
```

## Run the site

The pages load the JSON file with `fetch()`, so they must be opened through a local server.
For example, with the VS Code Live Server extension, or:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Themes

The header has a theme switch on every page:

- **Battery Saver Mode** - light gray background, black text and black buttons.
- **Performance Mode** - black background, white text and white buttons.

The choice is saved in `localStorage` and restored on every page.

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
│       ├── api.js
│       ├── storage.js
│       ├── ui.js
│       ├── compare.js
│       ├── home.js
│       ├── catalogue.js
│       ├── details.js
│       ├── favorites.js
│       └── comparePage.js
├── data/laptops.json
├── dist/output.css
├── assets/
├── package.json
└── README.md
```

## GitHub

Repository link: add your repository URL here before submitting.
