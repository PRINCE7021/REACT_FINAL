# BioGazer — DNA Analysis & Visualization System

BioGazer is a professional, biotech-styled React dashboard that lets scientists view, search, edit and analyze long strips of genetic code (DNA), track mutations visually, and manage patient mutation-risk data at scale.

Built for the case study: *"Create a tool for scientists to view and analyze long strips of genetic code (like DNA) and visually track where changes or mutations have occurred."*

---

## ✨ Features

- **Dashboard** — sidebar navigation, live stat cards (total sequences, total patients, mutation count, risk statistics), featured sequence preview, highest-risk patient list.
- **Color-Coded DNA Viewer** — A=green, T=red, G=blue, C=yellow, scrollable monospace viewer, in-sequence search with row highlighting, mutation diff highlighting against the original sequence.
- **Gene Edit System** — edit a sequence, validate it, and commit changes to a history stack with full **Undo / Redo**.
- **Sequence Organizer** — search, filter by gene, and sort the full DNA sequence library.
- **Patient Records** — 1,200+ generated patient records (ID, name, age, gender, DNA ID, risk level) with instant search, multi-filter, sorting and pagination — only the current page renders, so the UI stays smooth at scale.
- **Mutation Risk Calculator** — enter a mutation count and get an instant Low / Medium / High colored badge (0–2 Low, 3–5 Medium, 6+ High).
- **Study Settings Hub** — light/dark theme, notification toggle, and DNA row display length, broadcast app-wide via context and persisted to `localStorage`.
- **Genetic Analysis Safety** — strict input validation; only `A`, `T`, `G`, `C` are accepted, with clear inline errors for anything else.
- **Smart Gene Search** — real-time matching against a curated gene reference set (BRCA1, BRCA2, TP53, EGFR, KRAS, PTEN, and more), with match highlighting and an optional live enrichment lookup via Axios (falls back to local data automatically if offline).
- **Light/Dark mode, responsive layout, loading states and empty states** throughout.

## 🧱 Tech Stack

- React 18 (functional components + hooks: `useState`, `useEffect`, `useContext`, `useMemo`, `useCallback`)
- React Router DOM v6
- Axios
- Vite
- Plain CSS with a themeable design-token system (no UI framework lock-in)

## 📁 Project Structure

```
biogazer/
├── public/
├── src/
│   ├── components/      # Sidebar, Navbar, Layout, StatCard, DNAStrand, PatientTable, Pagination, RiskBadge, Loader, EmptyState
│   ├── pages/            # Home, DNAViewer, Patients, GeneSearch, RiskCalculator, Settings
│   ├── context/          # AppContext (theme, settings, toast notifications)
│   ├── data/              # patients.js, dnaSequences.js, genes.js (dummy datasets)
│   ├── services/          # dnaService.js (validation/risk/diff logic), api.js (axios client)
│   ├── assets/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🚀 Installation & Running Locally

Requires Node.js 18+.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the printed local URL (default: http://localhost:5173)
```

To build for production:

```bash
npm run build
npm run preview
```

## 📸 Screenshots

> Add screenshots of the Dashboard, DNA Viewer, Patients table, and Risk Calculator here once the app is running locally.

| Dashboard | DNA Viewer | Patients |
|---|---|---|
| _add image_ | _add image_ | _add image_ |

## 🔗 Links

- **GitHub Repository:** https://github.com/PRINCE7021/REACT_FINAL
- **Live Demo:** _add deployed link here (e.g. Vercel/Netlify) once deployed_

## 📄 Notes

All patient and sequence data is synthetically generated for demonstration purposes and contains no real clinical information.
