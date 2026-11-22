# Student Laptop Finder

A responsive five-page web app that helps students browse laptops, search and filter them,
read the full specifications of one laptop, save favorites, and compare favorites side by side.

The app opens directly from `index.html`. No local server is needed: the laptop list is stored
in `data/laptops.js` and every script is a classic script.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Home page with live statistics and top picks |
| `laptops.html` | Catalogue with search, filters, sorting and favorites |
| `details.html` | Full details of one laptop, selected with `?id=` |
| `favorites.html` | Saved laptops with total and average price |
| `compare.html` | Side-by-side comparison of two to four favorites |

## Open the app

Double-click `index.html`, or open it in a browser:

```bash
open index.html
```

No install or build step is needed to use the app. The compiled stylesheet is already in
`dist/output.css`.

## Change the styles

The styles use Tailwind CSS 4. If you change `src/input.css` or the class names in the HTML,
rebuild the stylesheet:

```bash
npm install
npm run build
```

To rebuild on every change while working:

```bash
npm run dev
```

## Laptop data

- `data/laptops.json` is the readable copy of the laptop data.
- `data/laptops.js` is the same data wrapped in `window.LAPTOPS = [...]` so it can load from
  `file://`.

If you edit the JSON file, copy the same list into `data/laptops.js` so the pages show the
change.

## Themes

The header has a theme switch on every page:

- **Battery saver** - light gray page, white cards, black text and buttons.
- **Performance** - black page, dark gray cards, white text and buttons.

Only black, white and gray tones are used. The choice is saved in `localStorage` and restored
on every page.

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
│   ├── laptops.json
│   └── laptops.js
├── dist/output.css
├── assets/
├── package.json
└── README.md
```

## GitHub

Repository link: add your repository URL here before submitting.
