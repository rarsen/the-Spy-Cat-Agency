# Spy Cat Agency Backend API

A FastAPI-based REST API for managing spy cats, missions, and targets for the Spy Cat Agency.

## Features

- **Spy Cats Management**: Create, read, update, and delete spy cats
- **Missions Management**: Create missions with targets, assign cats, track completion
- **Targets Management**: Update notes and completion status for targets
- **Breed Validation**: Validates cat breeds using TheCatAPI
- **Database**: PostgreSQL with SQLAlchemy ORM
- **API Documentation**: Automatic OpenAPI/Swagger documentation

## Requirements

- Python 3.8+
- PostgreSQL
- pip

## Installation

1. **Clone the repository and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup PostgreSQL database**
   - Install PostgreSQL if not already installed
   - Create a database named `postgres` (or update the DATABASE_URL in .env)
   - The user should have full permissions on the database

5. **Environment Configuration**
   ```bash
   cp env.example .env
   ```
   Edit `.env` file with your database credentials if needed.

## Running the Application

1. **Start the server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

2. **The API will be available at:**
   - API Base URL: http://localhost:8000
   - Interactive API Docs (Swagger): http://localhost:8000/docs
   - Alternative API Docs (ReDoc): http://localhost:8000/redoc

## API Endpoints

### Spy Cats
- `POST /api/v1/spy-cats/` - Create a new spy cat
- `GET /api/v1/spy-cats/` - List all spy cats
- `GET /api/v1/spy-cats/available` - List available spy cats (no active missions)
- `GET /api/v1/spy-cats/{cat_id}` - Get a specific spy cat
- `PUT /api/v1/spy-cats/{cat_id}` - Update spy cat salary
- `DELETE /api/v1/spy-cats/{cat_id}` - Delete a spy cat

### Missions
- `POST /api/v1/missions/` - Create a new mission with targets
- `GET /api/v1/missions/` - List all missions
- `GET /api/v1/missions/{mission_id}` - Get a specific mission
- `PUT /api/v1/missions/{mission_id}/assign` - Assign a cat to a mission
- `DELETE /api/v1/missions/{mission_id}` - Delete a mission (only if unassigned)

### Targets
- `GET /api/v1/missions/targets/{target_id}` - Get a specific target
- `PUT /api/v1/missions/targets/{target_id}` - Update target notes or completion status

## Postman Collection

Access the Postman collection for testing the API: [Spy Cat Agency API Collection](https://www.postman.com/your-collection-link)

## Database Schema

### SpyCat
- `id`: Primary key
- `name`: Cat's name
- `years_of_experience`: Years of experience
- `breed`: Cat breed (validated against TheCatAPI)
- `salary`: Cat's salary

### Mission
- `id`: Primary key
- `cat_id`: Foreign key to SpyCat (nullable)
- `complete`: Mission completion status

### Target
- `id`: Primary key
- `mission_id`: Foreign key to Mission
- `name`: Target name
- `country`: Target country
- `notes`: Notes about the target
- `complete`: Target completion status

## Business Rules

1. A cat can only have one active mission at a time
2. A mission must have 1-3 targets
3. Missions can only be deleted if not assigned to a cat
4. Target notes cannot be updated if the target or mission is completed
5. Mission is automatically marked complete when all targets are complete
6. Cat breeds are validated against TheCatAPI

## Testing

Run tests with:
```bash
pytest
```

## Development

The application uses:
- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Pydantic**: Data validation using Python type annotations
- **Alembic**: Database migration tool
- **httpx**: HTTP client for external API calls

## External Dependencies

- **TheCatAPI**: Used for validating cat breeds (https://api.thecatapi.com/v1/breeds) 