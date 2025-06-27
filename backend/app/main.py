from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import engine
from . import models
from .routers import spy_cats, missions

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Spy Cat Agency API",
    description="CRUD application for managing spy cats, missions, and targets",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# routers
app.include_router(spy_cats.router, prefix="/api/v1")
app.include_router(missions.router, prefix="/api/v1")


@app.get("/")
def read_root():
    return {"message": "Welcome to the Spy Cat Agency API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"} 