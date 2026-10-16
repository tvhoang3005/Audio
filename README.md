# Persie Hoang MP3

A music-streaming web UI built with React. You can browse trending tracks and charts, queue songs, play them in a persistent bottom player, and sign in to a personal "My Music" page.

The project started in 2019 on React 16 and Create React App. It has since been migrated to React 19, Vite, Redux Toolkit and React Router 8. The [migration notes](#migration-notes) below cover what changed.

## Tech stack

| Area       | Tools                                                              |
| ---------- | ------------------------------------------------------------------ |
| UI         | React 19 (function components and hooks), SCSS                     |
| State      | Redux Toolkit 2 (`createSlice`, `createAsyncThunk`), React Redux 9 |
| Routing    | React Router 8 (declarative mode)                                  |
| Build      | Vite 8                                                             |
| Testing    | Vitest 5, React Testing Library, jsdom                             |
| Code style | ESLint 9 (flat config), Prettier 3                                 |

## Getting started

**Requirements:** Node.js **22.22 or later** (an `.nvmrc` pins Node 24 LTS).

```bash
nvm use            # optional
npm install
npm run dev        # http://localhost:3000
```

### Demo account

There's no auth backend. The only account that can log in is:

- Email: `hoangpersievn@gmail.com`
- Password: `123`

After you log in, the session (email only) is kept in `localStorage`.

### Song API

The home page track list and charts are static demo data. Playback works differently: playing a song calls `GET {VITE_API_URL}/song/:id`, which should return:

```json
{
    "id": "2tA704YZh",
    "title": "Bánh Mì Không",
    "artists": ["Đạt G", "DuUyen"],
    "thumbnail": "https://…/cover.jpg",
    "source": "https://…/audio.mp3"
}
```

Any [json-server](https://github.com/typicode/json-server)-compatible backend works. An empty starter database is in `mock/db.json`. To point the app at another API, copy `.env.example` to `.env` and set `VITE_API_URL` (the default is `http://localhost:3004`).

## Scripts

| Command                | Description                        |
| ---------------------- | ---------------------------------- |
| `npm run dev`          | Start the dev server with HMR      |
| `npm run build`        | Production build to `dist/`        |
| `npm run preview`      | Serve the production build locally |
| `npm test`             | Run tests in watch mode            |
| `npm run test:run`     | Run tests once (CI)                |
| `npm run lint`         | Lint with ESLint                   |
| `npm run format`       | Format with Prettier               |
| `npm run format:check` | Check formatting without writing   |

## Project structure

```
src/
├── main.jsx              # createRoot entry: StrictMode, Redux Provider, BrowserRouter
├── App.jsx               # Layout and route table
├── config.js             # API URL and public asset helper
├── store/                # Redux Toolkit slices and store factory
│   ├── index.js          # setupStore()
│   ├── authSlice.js      # Demo login and persisted session
│   ├── songSlice.js      # Current song, fetchSong thunk, play state
│   ├── queueSlice.js     # "Next up" queue
│   ├── chartSlice.js     # Chart data and active tab
│   ├── trackSlice.js     # Home page track list
│   └── uiSlice.js        # Dropdowns, now-playing animation, modal
├── components/           # Feature components, each with its own .scss
│   └── Pages/            # Route-level pages
├── utils/                # API client, localStorage helpers, slug helper
└── test/                 # Vitest setup and render helper
```

## Migration notes

These are the changes from the original React 16.12 / CRA 3.3 codebase.

### Why it had to change

`react-scripts@3.3.0` uses webpack 4, which **fails to build on Node 17+** (`ERR_OSSL_EVP_UNSUPPORTED`). Create React App itself is deprecated. Several APIs the app depended on were also removed in React 19.

### Tooling

- Replaced Create React App with **Vite**. `index.html` moved to the project root, `%PUBLIC_URL%` / `process.env.PUBLIC_URL` became `import.meta.env.BASE_URL`, and files with JSX now use the `.jsx` extension.
- Replaced Jest (via `react-scripts test`) with **Vitest**, and the broken CRA boilerplate test with real coverage of routing, auth, the queue and UI state.
- Added ESLint 9 flat config (React, Hooks and React Refresh rules) and Prettier.
- SCSS is now compiled by Vite. The hand-compiled `.css` and `.css.map` files that used to be committed have been removed.
- Removed unused or bogus dependencies: `bootstrap`, `ionicons`, `react-ionicons`, `thunk@0.0.1`, and `redux-thunk` (now built into Redux Toolkit).

### React 16 → 19

| Legacy pattern                                      | Replacement                                               |
| --------------------------------------------------- | --------------------------------------------------------- |
| `ReactDOM.render(...)`                              | `createRoot(container).render(...)` inside `<StrictMode>` |
| String refs (`ref="audio"`, `this.refs.audio`)      | `useRef`                                                  |
| `ReactDOM.findDOMNode` + manual `classList` changes | Component state driving `className` / `style`             |
| Class components                                    | Function components with hooks                            |
| `import React` in every file                        | Automatic JSX runtime                                     |
| `react-input-range` (unmaintained, React ≤ 16)      | Native `<input type="range">` styled to match             |
| rAF polling loop for playback progress              | `<audio>` `onTimeUpdate` / `onDurationChange` events      |

### Redux → Redux Toolkit

- `createStore` + `applyMiddleware(thunk)` became `configureStore`.
- Hand-written action-type constants, action creators and `switch` reducers were rewritten as `createSlice` slices. Song fetching and login use `createAsyncThunk`.
- `connect()` containers and the `HaveDropDown` / `HaveLazyloadImage` HOCs were replaced by `useSelector` / `useDispatch` in the components that need them. This removed the `containers/` and `HOC/` layers and the circular barrel imports.

### React Router 5 → 8

- `Switch` became `Routes`, the `component` / `render` props became `element`, and `Redirect` became `Navigate`.
- `PrivateRoute` became a `RequireAuth` wrapper. `withRouter` and `match` props became `useLocation` / `useParams`, and `useRouteMatch` became `useMatch`.
- Imports moved from `react-router-dom` to `react-router` (v8 removed `react-router-dom`).
- Added a catch-all "Page not found" route.

### Bugs fixed during the migration

- **Next/previous in the player** skipped to the wrong song. `for…in` indices are strings, so `i + 1` concatenated instead of adding.
- **Queue item deletion mutated Redux state** in place (`Array.prototype.splice`).
- **Song dropdowns** compared against a state field that didn't exist, so clicking "more" on another song closed the open menu instead of switching to it.
- **Genre picker** on the home page attached new click listeners on every click and ignored the first selection. All its radio inputs also shared one `id`.
- **Mobile menu** never animated the log-out item, so it stayed invisible.
- **Song page** didn't refetch when navigating between songs.
- **Login session** was never restored on reload, and the password was written to `localStorage`.
- **Login loader animation**: an invalid `::nth-of-type` selector meant the staggered delays never applied.
