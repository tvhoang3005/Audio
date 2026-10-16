# Audiora

Audiora is a music-streaming web app built with React. You can browse trending tracks and charts, build a play queue, and listen through a player that stays docked at the bottom of every page.

## Features

- **Home page**: a trending track list with a genre picker, plus a chart panel with Top 10, K-Pop and V-Pop tabs
- **Persistent player**: play/pause, previous/next, a seek bar, and elapsed and total time
- **"Next up" queue**: songs join the queue as you play them or add them from a song's menu. You can remove one song or clear the whole queue.
- **Song menus**: each song has "Add to next up", "Add to playlist" and "Share" actions
- **Song pages**: a detail page for each song with its artwork and artist links
- **Sign-in**: a login page and a protected "My Music" page. The session survives a page reload.
- **Mobile layout**: an animated slide-in navigation menu on small screens

## Tech stack

| Area       | Tools                           |
| ---------- | ------------------------------- |
| UI         | React 19, SCSS                  |
| State      | Redux Toolkit 2, React Redux 9  |
| Routing    | React Router 8                  |
| HTTP       | Axios                           |
| Build      | Vite 8                          |
| Testing    | Vitest 5, React Testing Library |
| Code style | ESLint 9, Prettier 3            |

## Getting started

**Requirements:** Node.js 22.22 or later. The `.nvmrc` file pins Node 24 LTS.

```bash
npm install
npm run dev        # http://localhost:3000
```

### Demo account

There's no auth backend, so only this account can sign in:

- Email: `hoangpersievn@gmail.com`
- Password: `123`

### Song API

The track list and charts ship with the app as static demo data. Playing a song is different: the app requests `GET {VITE_API_URL}/song/:id` and expects a response like this:

```json
{
    "id": "2tA704YZh",
    "title": "Bánh Mì Không",
    "artists": ["Đạt G", "DuUyen"],
    "thumbnail": "https://…/cover.jpg",
    "source": "https://…/audio.mp3"
}
```

Any [json-server](https://github.com/typicode/json-server)-compatible backend works, and `mock/db.json` has an empty database to start from. The default API URL is `http://localhost:3004`. To use a different one, copy `.env.example` to `.env` and set `VITE_API_URL`.

## Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the dev server               |
| `npm run build`        | Build for production into `dist/`  |
| `npm run preview`      | Serve the production build locally |
| `npm test`             | Run tests in watch mode            |
| `npm run test:run`     | Run tests once                     |
| `npm run lint`         | Lint with ESLint                   |
| `npm run format`       | Format with Prettier               |
| `npm run format:check` | Check formatting                   |

## Project structure

```
src/
├── main.jsx          # App entry: Redux store and router setup
├── App.jsx           # Layout and routes
├── config.js         # API URL and asset paths
├── store/            # Redux Toolkit slices (auth, song, queue, chart, track, ui)
├── components/       # UI components, each with its own styles
│   └── Pages/        # Route-level pages
├── utils/            # API client and helpers
└── test/             # Test setup
```
