from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import crud, schemas
from ..external_services import validate_cat_breed


router = APIRouter(prefix="/spy-cats", tags=["spy-cats"])


@router.post("/", response_model=schemas.SpyCat, status_code=status.HTTP_201_CREATED)
async def create_spy_cat(cat: schemas.SpyCatCreate, db: Session = Depends(get_db)):
    """Create a new spy cat"""
    # Validate breed with TheCatAPI
    is_valid_breed = await validate_cat_breed(cat.breed)
    if not is_valid_breed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid cat breed: {cat.breed}"
        )
    
    return crud.create_spy_cat(db=db, cat=cat)


@router.get("/", response_model=List[schemas.SpyCat])
def read_spy_cats(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all spy cats"""
    cats = crud.get_spy_cats(db, skip=skip, limit=limit)
    return cats


@router.get("/available", response_model=List[schemas.SpyCat])
def read_available_spy_cats(db: Session = Depends(get_db)):
    """Get spy cats that don't have active missions"""
    cats = crud.get_available_spy_cats(db)
    return cats


@router.get("/{cat_id}", response_model=schemas.SpyCat)
def read_spy_cat(cat_id: int, db: Session = Depends(get_db)):
    """Get a specific spy cat by ID"""
    db_cat = crud.get_spy_cat(db, cat_id=cat_id)
    if db_cat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Spy cat not found"
        )
    return db_cat


@router.put("/{cat_id}", response_model=schemas.SpyCat)
def update_spy_cat(cat_id: int, cat_update: schemas.SpyCatUpdate, db: Session = Depends(get_db)):
    """Update a spy cat's salary"""
    db_cat = crud.update_spy_cat(db, cat_id=cat_id, cat_update=cat_update)
    if db_cat is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Spy cat not found"
        )
    return db_cat


@router.delete("/{cat_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_spy_cat(cat_id: int, db: Session = Depends(get_db)):
    """Delete a spy cat"""
    success = crud.delete_spy_cat(db, cat_id=cat_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Spy cat not found"
        ) 