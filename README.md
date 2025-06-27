# 🐱 Spy Cat Agency - Full Stack Application

A complete CRUD application for managing spy cats, missions, and targets. Built with FastAPI (backend) and Next.js (frontend).

## 📋 Project Overview

This project consists of two main components:
- **Backend API**: FastAPI-based REST API with PostgreSQL database
- **Frontend Dashboard**: Next.js application for spy cat management

## 🏗️ Architecture

```
Spy Cat Agency/
├── backend/                 # FastAPI Backend
│   ├── app/                # Application code
│   ├── requirements.txt    # Python dependencies
│   └── README.md          # Backend documentation
├── frontend/               # Next.js Frontend  
│   ├── src/               # Source code
│   ├── package.json       # Node.js dependencies
│   └── README.md         # Frontend documentation
└── README.md             # This file
```

## 🚀 Quick Start Guide

### Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.8+** (for backend)
- **Node.js 18.17+** (for frontend)  
- **PostgreSQL** (for database)
- **npm or yarn** (for frontend dependencies)

### 1. Database Setup

1. **Install PostgreSQL** if not already installed
2. **Create a database** (or use existing `postgres` database)
3. **Update database credentials** in `backend/env.example` and rename to `.env`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp env.example .env
# Edit .env with your database credentials

# Run the API server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend API will be available at: **http://localhost:8000**
- API Documentation: **http://localhost:8000/docs**
- Alternative Docs: **http://localhost:8000/redoc**

### 3. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev
```

The frontend application will be available at: **http://localhost:3000**

## 🎯 How to Use the Application

### Via Web Interface (Recommended)

1. **Open your browser** and navigate to http://localhost:3000
2. **View Spy Cats**: See all registered spy cats in the left panel
3. **Add New Cat**: Click "Add Spy Cat" button and fill out the form
4. **Edit Cat**: Click "Edit" on any cat to update their salary
5. **Delete Cat**: Click "Delete" to remove a cat from the system

### Via API Documentation

1. **Open API docs** at http://localhost:8000/docs
2. **Explore endpoints** using the interactive Swagger interface
3. **Test API calls** directly from the documentation

## 📝 Key Features

### Backend (FastAPI)
-  **Spy Cats CRUD**: Create, read, update, delete operations
-  **Missions Management**: Create missions with targets, assign cats
-  **Target Updates**: Update notes and completion status
-  **Breed Validation**: Integration with TheCatAPI
-  **Business Logic**: Enforces rules like one active mission per cat
-  **Database**: PostgreSQL with SQLAlchemy ORM
-  **Documentation**: Auto-generated OpenAPI/Swagger docs

### Frontend (Next.js)
-  **Spy Cat Dashboard**: Clean, responsive interface
-  **Form Validation**: Client-side validation with error handling
-  **Real-time Updates**: Live data synchronization
-  **Error Handling**: User-friendly error messages
-  **Modern UI**: Tailwind CSS styling
-  **TypeScript**: Type-safe development

## 🔧 Development Commands

### Backend Commands
```bash
cd backend

# Run development server
uvicorn app.main:app --reload

# Run with custom script
python run.py

# Run tests (when available)
pytest
```

### Frontend Commands
```bash
cd frontend

# Development server
npm run dev

# Production build
npm run build
npm start

# Type checking
npm run lint
```

## 📊 API Endpoints

### Spy Cats
- `POST /api/v1/spy-cats/` - Create spy cat
- `GET /api/v1/spy-cats/` - List all spy cats  
- `GET /api/v1/spy-cats/{id}` - Get specific spy cat
- `PUT /api/v1/spy-cats/{id}` - Update spy cat salary
- `DELETE /api/v1/spy-cats/{id}` - Delete spy cat

### Missions & Targets
- `POST /api/v1/missions/` - Create mission with targets
- `GET /api/v1/missions/` - List all missions
- `PUT /api/v1/missions/{id}/assign` - Assign cat to mission
- `PUT /api/v1/missions/targets/{id}` - Update target



## 🔍 Troubleshooting

### Common Issues

1. **Backend won't start**
   - Check PostgreSQL is running
   - Verify database credentials in `.env`
   - Ensure Python virtual environment is activated

2. **Frontend can't connect to backend**
   - Confirm backend is running on port 8000
   - Check browser console for CORS errors

3. **Database connection errors**
   - Verify PostgreSQL service is running
   - Check database exists and credentials are correct
   - Ensure user has proper permissions

4. **Breed validation fails**
   - TheCatAPI might be temporarily down
   - App falls back to predefined breed list

## 📁 Project Structure Details

### Backend Structure
```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI app
│   ├── database.py          # Database config
│   ├── models.py            # SQLAlchemy models
│   ├── schemas.py           # Pydantic schemas
│   ├── crud.py              # Database operations
│   ├── external_services.py # TheCatAPI integration
│   └── routers/             # API routes
│       ├── spy_cats.py      # Spy cat endpoints
│       └── missions.py      # Mission endpoints
```

### Frontend Structure
```
frontend/src/
├── app/
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── SpyCatForm.tsx       # Add/edit form
│   └── SpyCatList.tsx       # Cat list display
├── lib/
│   └── api.ts               # API client
└── types/
    └── index.ts             # TypeScript types
```

