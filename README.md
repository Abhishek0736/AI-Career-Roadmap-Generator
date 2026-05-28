# AI Career Roadmap Generator

A mini **Career Roadmap Generator** web application built with the mandatory tech stack:

- **Frontend**: Next.js (React) with Tailwind CSS for styling.
- **Backend**: Node.js + Express.
- **Database**: MongoDB (via Mongoose).

## Features

- Dashboard with input form to generate a career roadmap.
- Hard‑coded roadmap generation logic (easily replaceable with AI later).
- Save generated roadmaps in MongoDB.
- History page to view, open, and delete past roadmaps.

## Repository Structure
```
AI-Career-Roadmap-Generator/
├─ backend/            # Express server
│   ├─ models/
│   │   └─ Roadmap.js
│   ├─ routes/
│   │   └─ roadmap.js
│   ├─ .env.example
│   ├─ package.json
│   └─ server.js
├─ frontend/           # Next.js app
│   ├─ pages/
│   │   ├─ index.tsx
│   │   └─ history.tsx
│   ├─ components/
│   │   └─ RoadmapCard.tsx
│   ├─ lib/
│   │   └─ api.ts
│   ├─ tailwind.config.js
│   ├─ postcss.config.js
│   ├─ .env.local.example
│   └─ package.json
├─ .gitignore
└─ README.md
```

## Setup Instructions

### Prerequisites
- Node.js (>=18) 
- npm (or yarn)
- MongoDB instance (local or Atlas)
- Git

### Clone the repo
```bash
git clone https://github.com/Abhishek0736/AI-Career-Roadmap-Generator.git
cd AI-Career-Roadmap-Generator
```

### Backend
```bash
cd backend
cp .env.example .env   # set MONGODB_URI and PORT
npm install
npm run dev   # runs on http://localhost:5000
```

### Frontend
```bash
cd ../frontend
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_URL (e.g., http://localhost:5000)
npm install
npm run dev   # runs on http://localhost:3000
```

## Deployment
- **Frontend**: Deploy to Vercel (connect the repo, it auto‑detects Next.js).
- **Backend**: Deploy to Render, Railway, or Heroku. Provide the `MONGODB_URI` environment variable.

## Commit Discipline
- Meaningful incremental commits as per the plan (initialise repo, add backend, add frontend, styling, etc.).

## License
MIT
