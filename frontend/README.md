# Frontend

> React 18 + Vite portfolio frontend.

---

## Quick start

```bash
# 1. Navigate into this folder
cd frontend

# 2. Choose your framework (or skip for vanilla JS)
#    React:  npm install react react-dom @vitejs/plugin-react
#    Vue:    npm install vue @vitejs/plugin-vue
#    Svelte: npm install svelte @sveltejs/vite-plugin-svelte
#    None:   delete the "dependencies" block in package.json

# 3. Install dev dependencies
npm install

# 4. Set environment variables
cp .env.example .env
# Edit .env — set VITE_API_URL for production

# 5. Start the dev server (proxies /api/* to backend at port 5000)
npm run dev
```

---

## Folder structure

```
frontend/
├── index.html                  ← App shell — update <title> and <meta description>.
├── vite.config.js              ← Build config. Set framework plugin + API proxy port.
├── package.json                ← Install your framework + update project name.
├── .env.example                ← Environment variable template. Never commit .env.
├── .gitignore
├── Dockerfile                  ← Multi-stage build → nginx static serving.
└── src/
    ├── main.js                 ← ENTRY POINT. Uncomment your framework's mount code.
    ├── api/
    │   └── api.js              ← Fetch wrapper + per-resource API functions.
    │                             Add a function for each backend endpoint you call.
    ├── components/
    │   └── ExampleComponent.js ← Template component. Rename & replace with your UI.
    ├── pages/
    │   └── HomePage.js         ← Template page. Add one file per route.
    ├── styles/
    │   └── global.css          ← CSS variables (design tokens), reset, base styles.
    │                             Switch to Tailwind/Sass/CSS Modules here.
    └── utils/
        └── helpers.js          ← Pure utility functions (formatDate, debounce, etc.).
```

---

## Common tasks

### Switching frameworks

| Framework | Install | Uncomment in `vite.config.js` | Uncomment in `src/main.js` |
|-----------|---------|-------------------------------|----------------------------|
| React     | `npm install react react-dom @vitejs/plugin-react` | `import react` / `plugins: [react()]` | React block |
| Vue 3     | `npm install vue @vitejs/plugin-vue` | `import vue` / `plugins: [vue()]` | Vue block |
| Svelte    | `npm install svelte @sveltejs/vite-plugin-svelte` | `import { svelte }` / `plugins: [svelte()]` | Svelte block |
| Vanilla   | — | remove plugins array | Vanilla block |

### Adding a new page

1. Create `src/pages/NewPage.js` (copy `HomePage.js` as a starting point).
2. Register the route in your router (React Router / Vue Router / custom hash router).
3. Add navigation links in your layout component.

### Adding an API call

1. Open `src/api/api.js`.
2. Add a named export for each endpoint:
   ```js
   export const fetchUsers = ()       => apiFetch('/api/users');
   export const createUser = (data)   => apiFetch('/api/users', { method: 'POST', body: JSON.stringify(data) });
   ```
3. Import and call in your component/page.

### Using Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
Then replace `src/styles/global.css` with Tailwind directives and update `tailwind.config.js`.

### Using Sass/SCSS

```bash
npm install -D sass
```
Rename `global.css` → `global.scss` and update the import in `main.js`.

---

## Environment variables

| Variable        | Default | Description                                    |
|-----------------|---------|------------------------------------------------|
| `VITE_API_URL`  | `` (empty) | Backend base URL in production (e.g. `https://api.myapp.com`). Leave empty to use the Vite proxy in dev. |

> ⚠️ Only variables prefixed with `VITE_` are exposed to the browser.

---

## Scripts

| Command          | Description                        |
|------------------|------------------------------------|
| `npm run dev`    | Start Vite dev server (port 3000)  |
| `npm run build`  | Production build → `dist/`         |
| `npm run preview`| Preview the production build       |
| `npm run lint`   | Run ESLint                         |
