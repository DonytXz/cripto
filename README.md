# Tradia

React 19 single-page application built with Vite 8.

## Requirements

- Node.js 22.22+
- npm 10+

## Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Vite serves the development app at `http://localhost:5173`.

## Environment

The browser-facing API base URLs use Vite's `VITE_` prefix:

```dotenv
VITE_API_LOGIN=https://api.example.com/deepia
VITE_API_DATA=https://data.example.com
```

These values are bundled into the client and must not contain secrets.

## Commands

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production bundle in `dist/`.
- `npm run preview` previews the production bundle locally.
- `npm run lint` checks the JavaScript and JSX source.

Because this app uses `BrowserRouter`, production hosting must route unknown paths
back to `index.html`.
