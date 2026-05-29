# AI Career Roadmap Generator

This project is a full-stack career roadmap generator built as a development assessment. It demonstrates a complete web application that allows users to create personalized career roadmaps, save them to a database, and review past results.

## Project Overview

The application consists of:

- **Frontend**: Next.js with React and Tailwind CSS for a responsive UI.
- **Backend**: Node.js and Express for API endpoints and roadmap persistence.
- **Database**: MongoDB with Mongoose for storing generated roadmaps.

The goal is to build a working full-stack solution that:

- accepts roadmap input from the user,
- generates a career roadmap response,
- saves user-generated roadmap data,
- displays a history of previous roadmaps,
- supports viewing and deleting saved roadmaps.

## Live Demo

https://ai-career-roadmap-generator.vercel.app/

## Assessment Requirements Covered

- Implement a **frontend** using Next.js and Tailwind CSS.
- Build a **backend** using Node.js and Express.
- Use **MongoDB** to persist generated roadmap documents.
- Create API routes for creating, retrieving, and deleting roadmaps.
- Provide a **history page** that shows saved roadmap entries.
- Maintain a clean project structure with separate frontend and backend folders.
- Add documentation, setup instructions, and author contact information.

## Features

- **Roadmap generation form** with user input fields.
- **Save roadmap** output to MongoDB.
- **History view** to access all saved roadmaps.
- **View saved roadmap details** from history.
- **Delete saved roadmap** entries.
- **Responsive layout** using Tailwind CSS.

## Repository Structure

```
Full Stack Development Assessment/
├─ backend/
│  ├─ config/
│  │  └─ db.js
│  ├─ controllers/
│  │  └─ roadmapController.js
│  ├─ models/
│  │  └─ Roadmap.js
│  ├─ routes/
│  │  └─ roadmap.js
│  ├─ utils/
│  │  └─ roadmapGenerator.js
│  ├─ package.json
│  └─ server.js
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ app/
│  │  │  ├─ globals.css
│  │  │  ├─ layout.js
│  │  │  └─ page.js
│  │  │  └─ history/page.js
│  │  └─ components/
│  │     ├─ Footer.jsx
│  │     ├─ Hero.jsx
│  │     ├─ HistoryCard.jsx
│  │     ├─ Loader.jsx
│  │     ├─ Navbar.jsx
│  │     ├─ RoadmapForm.jsx
│  │     └─ Timeline.jsx
│  ├─ services/
│  │  └─ api.js
│  ├─ jsconfig.json
│  ├─ next.config.mjs
│  ├─ package.json
│  ├─ postcss.config.mjs
│  └─ tailwind.config.js
├─ screenshots/
│  ├─ AI Engine.png
│  ├─ Generate Roadmap.png
│  ├─ Home Page.png
│  └─ Saved Roadmap.png
└─ README.md
```

## Screenshots

Project screenshots are included in the `screenshots/` folder to document the app interface safely.

- `screenshots/Home Page.png`
- `screenshots/AI Engine.png`
- `screenshots/Generate Roadmap.png`
- `screenshots/Saved Roadmap.png`

> These screenshot files are stored in the repository and can be viewed directly from the `screenshots` folder.

## Setup Instructions

### Prerequisites
- Node.js
- npm
- MongoDB (local or Atlas)

### Backend Setup

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from the example and update the MongoDB URL:

```bash
copy .env.example .env
```

4. Start the backend server:

```bash
npm run dev
```

### Frontend Setup

1. In another terminal, go to the frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a local environment file if needed:

```bash
copy .env.local.example .env.local
```

4. Start the frontend app:

```bash
npm run dev
```

## Usage

- Open the frontend in your browser (usually `http://localhost:3000`).
- Fill out the roadmap form and generate a career roadmap.
- Save the generated roadmap to MongoDB.
- Visit the history page to review or delete saved roadmaps.

## Author

- Name: **Abhishek Kumar**
- Email: **akabhi0736@gmail.com**

## Notes

This repository is created as part of a full-stack assessment and demonstrates building a connected frontend/backend application with persistent data storage.
