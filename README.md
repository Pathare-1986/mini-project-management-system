# Mini Project Management System

A mini project management system with a Node.js + Express + MongoDB backend and a React + Vite frontend. The application lets users create projects, add and manage tasks inside each project, filter tasks by status, sort tasks by due date, and track progress through a polished browser UI.

## Overview

This project was built for a mini full-stack assignment. It includes backend APIs, a frontend that consumes those APIs, validation, pagination, error handling, and a clean UI for demonstrating the workflow end to end.

## Features

- Create, list, view, and delete projects
- Add, update, filter, sort, and delete tasks
- Pagination for project listing
- Task filtering by status
- Task sorting by due date
- Input validation and centralized error handling
- Responsive UI with loading, empty, and confirmation states
- Toast notifications for user feedback

## Tech Stack

- Frontend: React, Vite, React Router, Axios, Tailwind CSS
- Backend: Node.js, Express.js, MongoDB, Mongoose
- Validation: express-validator
- Utilities: dotenv, helmet, cors, morgan

## Project Structure

```text
backend/
  src/
    config/
    controllers/
    middleware/
    models/
    routes/
    utils/
    validators/
    app.js
    server.js
frontend/
  src/
    api/
    components/
    context/
    layouts/
    pages/
    routes/
    services/
```

## Database Design

### Projects

- `id`
- `name`
- `description`
- `created_at`

### Tasks

- `id`
- `project_id`
- `title`
- `description`
- `status` (`todo`, `in-progress`, `done`)
- `priority` (`low`, `medium`, `high`)
- `due_date`
- `created_at`

## API Endpoints

All backend routes are mounted under `/api`.

### Project APIs

- `POST /api/projects`
- `GET /api/projects?page=1&limit=10&search=website`
- `GET /api/projects/:id`
- `DELETE /api/projects/:id`

Example project payload:

```json
{
  "name": "Website Redesign",
  "description": "Refresh the landing page and dashboard UI"
}
```

### Task APIs

- `POST /api/projects/:projectId/tasks`
- `GET /api/projects/:projectId/tasks?status=todo&sort=asc`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

Example task payload:

```json
{
  "title": "Build hero section",
  "description": "Create a polished landing hero",
  "status": "todo",
  "priority": "high",
  "due_date": "2026-06-01"
}
```

## Validation And Error Handling

The backend validates required fields and allowed values before creating or updating records.

Examples:

- Project name is required and must stay within the length limit
- Task title is required and must stay within the length limit
- Task status must be one of `todo`, `in-progress`, or `done`
- Task priority must be one of `low`, `medium`, or `high`
- Invalid IDs return proper validation or not-found responses

Standard error response shape:

```json
{
  "success": false,
  "message": "Validation failed"
}
```

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Start the backend

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Backend environment variables:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini-project-management
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

### 2. Start the frontend

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Frontend environment variables:

```env
VITE_API_URL=http://localhost:5000/api
```

## Available Scripts

### Backend

- `npm run dev` - start the server with nodemon
- `npm start` - start the server in production mode

### Frontend

- `npm run dev` - start the Vite development server
- `npm run build` - build the frontend for production
- `npm run preview` - preview the production build

## UI Highlights

- Project dashboard with search and summary cards
- Project detail page with task statistics
- Task create/edit form
- Task filtering by status
- Task sorting by due date
- Delete confirmation modal
- Toast notifications for success and error states
- Loading and empty states

## How to Test the API (quick)

You can test the backend APIs with Postman (import `POSTMAN_COLLECTION.json`)

Postman import:

1. Open Postman.
2. File → Import → Choose Files → select `POSTMAN_COLLECTION.json` in the repository root.
3. Set the `base_url` collection variable to `http://localhost:5000/api`.


## Deployment Notes
- MongoDB can be hosted on MongoDB Atlas

After deployment, update:

- `CORS_ORIGIN` in the backend environment
- `VITE_API_URL` in the frontend environment

## Notes

- The frontend consumes the backend APIs directly through Axios services.
- Project data includes a summary of task completion in the UI.
- Task lists support filtering and due-date sorting from the project details page.
