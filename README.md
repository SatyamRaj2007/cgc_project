# CGC Smart Campus

An AI-powered campus companion for CGC Mohali. This repository starts as a React client and Express API monorepo, with MongoDB and external integrations added behind environment configuration.

## Requirements

- Node.js 20 or newer
- npm 10 or newer
- MongoDB for data-backed features (the starter API runs without it)

## Start locally

1. Copy `.env.example` to `server/.env` and set values as needed.
2. Run `npm install` from the repository root.
3. Run `npm run dev` to start the API at `http://localhost:5000` and the client at `http://localhost:5173`.

The dashboard, academics planner, and API health endpoint work without AI keys. Academic workspaces sync with the API when it is available and fall back to browser storage when it is not. Never commit `.env` files or production secrets.

## Repository layout

```text
client/   React, Vite, and Tailwind application
server/   Express API, health endpoint, and integration-ready structure
```

## Current milestone

- Responsive student workspace and dashboard.
- Academics page with subject attendance tracking and assignment add, complete, filter, and delete actions.
- Versioned API health endpoint at `GET /api/v1/health` and academic workspace endpoint at `GET/PUT /api/v1/academics`.
- Browser workspaces are separated by an anonymous browser-generated session key.
- MongoDB persistence is enabled by setting `MONGODB_URI`; without it, the API uses temporary in-memory storage and the client also saves a local copy.

The project brief describes the larger product direction. The academics planner currently starts with sample subjects and assignments. Authentication, durable data storage, AI calls, file uploads, and live campus data are future work. Other sections currently show a workspace placeholder. Configure provider credentials only when those integrations are built.
