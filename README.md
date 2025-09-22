# nhm-frontend

Frontend application for **NHM** - Proyecto Nehemías, built with **React + Vite**.

---

## Table of Contents

- [Demo / Screenshots](#demo--screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Architecture](#architecture)
- [Configuration](#configuration)
- [Caching / Image Handling](#caching--image-handling)
- [Code Quality](#code-quality)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Demo / Screenshots

_Add screenshots of the UI here or link to a live demo if available._

---

## Features

- ⚡️ Fast, modern frontend using **React + Vite**
- 🎨 Styled with **MUI** components (Material UI)
- 🖼 Avatar & image handling with client-side caching
- 📱 Responsive design for desktop & mobile
- 🛠 ESLint + Prettier for clean, consistent code
- 🔌 API integration with configurable environment variables

---

## Tech Stack

- **Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **UI Library:** [MUI](https://mui.com/)
- **Linting / Formatting:** ESLint, Prettier
- **Other notable dependencies:** Router, Axios, Google Drive

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) **v22+**
- npm

### Installation

```bash
git clone https://github.com/hparody/nhm-frontend.git
cd nhm-frontend
npm install
```

### Development

```bash
npm run dev
```

This launches the development server with hot module reloading.
Open http://localhost:5173 in your browser.

### Production Build

```bash
npm run build
```

Optimized files are generated in the dist/ folder.
To preview locally:

```bash
npm run preview
```

---

## Architecture

```bash
nhm-frontend/
├── public/          # Static assets
├── src/
│   ├── assets/      # Local images, fonts, etc.
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Main views / routes
│   ├── services/    # API clients, helpers
│   └── App.jsx      # Root component
├── vite.config.js   # Vite configuration
└── package.json
```

---

## Configuration

The app expects some environment variables. Create a `.env` file in the project root.

| Variable               | Description                                | Example Value             |
| ---------------------- | ------------------------------------------ | ------------------------- |
| `VITE_API_URL`         | Base URL for backend API                   | `https://api.example.com` |
| `VITE_DRIVE_PROXY_URL` | (Optional) Proxy endpoint for Google Drive | `https://proxy.myapp.com` |

---

## Caching / Image Handling

- Images (e.g., avatars) are preloaded and cached in memory with `Blob` URLs.
- This avoids redundant network requests when switching between views.
- A `Map` with a **`MAX_CACHE_SIZE`** is used to prevent unbounded memory growth.
- ⚠️ **Note:** Cache is reset on page reload, since blobs are stored in memory only.

Future enhancements might include persistent caching (IndexedDB, Service Workers, or a CDN with proper `Cache-Control` headers).

---

## Code Quality

- ESLint config is included (`eslint.config.js`)
- Prettier for formatting
- GitHub Actions / CI config can be added for automated checks

Run lint:

```bash
npm run lint
```

---

## Deployment

### Build for production

```bash
npm run build
```

### Deploy

You can host the dist/ folder on any static hosting provider:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- AWS S3 + CloudFront, GitHub Pages, etc.

---

## Contribuiting

1. Fork this repository
2. Create your feature branch (`bash git checkout -b feature/my-feature`)
3. Commit your changes (`bash git commit -m 'Add my feature`)
4. Push to the branch (`bash git push origin feature/my-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License – see the [LICENSE]() file for details.

---

## Contact

Author: [@hparody](https://github.com/hparody)

For questions, issues, or suggestions, please open an issue.

---
