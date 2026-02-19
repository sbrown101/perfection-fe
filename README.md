# Stardew Perfection Helper

A web application that helps Stardew Valley players track their progress toward achieving perfection in the game.

## Overview

Stardew Perfection Helper analyzes your Stardew Valley save file and provides a detailed breakdown of tasks you need to complete to achieve perfection. The application displays tasks with their requirements including:

- Seasons when tasks can be completed
- Locations where tasks can be performed
- Weather conditions required
- Time of day requirements

## Features

- Upload and analyze Stardew Valley save files (XML format)
- Filter tasks by category
- View detailed conditions for each task
- Links to additional information for specific tasks

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Testing**: Playwright for end-to-end testing
- **Backend**: Separate service running on localhost:8080 that analyzes save files

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- A local backend server running on port 8080 (see Backend Setup)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the local server address shown in your terminal

### Backend Setup

The application requires a backend server running on `http://localhost:8080` with an `/analyze` endpoint that accepts Stardew Valley save files (XML) and returns task data.

## Usage

1. Start the application and ensure the backend server is running
2. Click the file input button and select your Stardew Valley save file (XML format)
3. Click "Analyse Save" to process your save file
4. View your perfection tasks and filter them by category using the buttons at the top
5. Each task displays its requirements including seasons, locations, weather, and time

## Development

- `npm run dev` - Start the development server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run preview` - Preview the production build locally
