![NightSky](/NightSky.png)

# Re-NightSky

Re-NightSky is a small Vite-powered web experience that turns your input into a starry scene. Type a number, press **Enter**, and watch the sky fill with stars followed by a short romantic line. Use **Retry** to clear the sky and start again.

## Features

- Animated stars with staggered appearance and twinkle effects.
- Reset to try different star counts.

## Getting Started

### Prerequisites

- Node.js 20+

### Install

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Then open the local URL printed in your terminal.

## Scripts

| Command           | Description                               |
| ----------------- | ----------------------------------------- |
| `npm run dev`     | Start the development server.             |
| `npm run build`   | Type-check and create a production build. |
| `npm run preview` | Preview the production build locally.     |
| `npm run lint`    | Run ESLint on the project.                |

## Project Structure

```text
/
├── index.html
├── public/
│   ├── favicon.svg
│   └── og-nightsky.png
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   └── App.css
├── vite.config.ts
└── package.json
```

## Usage Tips

- Pick a number from 1 to 100 to decide how many stars will light up the sky
- Click **Retry** to reset and try another number.
- Enjoy the romantic message that appears with the stars!
