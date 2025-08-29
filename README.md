# 🎶 TuneNest Music Player

TuneNest is a modern, responsive **music player** built with **React** and **Vite**, styled with **Tailwind CSS v3**. It lets users **search songs and artists via the Deezer API** and play **30-second previews** in a sleek, mobile-first UI with a floating audio player and dark/light theme toggle.

---

## ✨ Features

- 🔎 **Search** for tracks and artists (Deezer API)
- ▶️ **30-second previews** with play/pause & scrub
- 🌗 **Dark / Light mode** toggle
- 🪟 **Glassmorphism cards** with subtle hover effects
- 📟 **Floating mini player** with progress bar
- 📱 **Fully responsive** (mobile, tablet, desktop)

---

## 🧰 Tech Stack

- **React** + **Vite**
- **Tailwind CSS v3**
- **Deezer API**
- **React Icons**

---

## 🚀 Quick Start

```bash
# 1) Clone
git clone https://github.com/Tholoana96/TuneNest.git
cd TuneNest

# 2) Install
npm install

# 3) Run dev server
npm run dev

# 4) Build production bundle
npm run build

# 5) Preview production build (optional)
npm run preview
```

> If you deploy behind a serverless proxy (e.g., Netlify Functions in `netlify/functions`), no client secrets are exposed. You can call your function endpoint from the app to avoid CORS and rate-limit headaches.

---

## 🎮 Usage

1. **Start the app** locally with `npm run dev` and open the printed URL.
2. **Search** for a song or artist using the search input.
3. **Click a track** card to start the **30-second preview**.
4. Control playback with the **floating audio player** (play/pause, seek).
5. Use the **theme toggle** to switch between light and dark modes.

---

## 📁 Project Structure

```text
.
├─ netlify/
│  └─ functions/          # Serverless functions (API proxy, etc.)
├─ public/                # Static assets
├─ src/
│  ├─ components/         # Reusable UI components
│  ├─ pages/              # Top-level views (Home/Search/etc.)
│  ├─ styles/             # Tailwind or custom CSS modules (if any)
│  └─ main.jsx            # App entry (or index.jsx depending on setup)
├─ .gitignore
├─ index.html
├─ eslint.config.js
├─ netlify.toml           # Netlify build + functions config
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
└─ vite.config.js
```

_(Folder/file names may vary slightly depending on the latest commits.)_

---

## 🧪 Future Enhancements

- Full-track playback (with appropriate licensing)
- Playlists & favorites
- User authentication and cloud sync
- Offline caching for previews
- i18n (multi-language UI)
- Expanded accessibility (ARIA/keyboard coverage)
- Unit & integration tests

---

## 🤝 Contributing

1. **Fork** the repository
2. Create a branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "feat: add awesome thing"
   ```
4. **Push** the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. **Open a Pull Request**

---

## 🛡️ License

**MIT** — free to use, modify, and distribute.

---

## 👩🏽‍💻 Author

Built with ❤️ by **[Tholoana Manyane](https://github.com/Tholoana96)**
