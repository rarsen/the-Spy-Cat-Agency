from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from ..database import get_db
from .. import crud, schemas


router = APIRouter(prefix="/missions", tags=["missions"])


@router.post("/", response_model=schemas.Mission, status_code=status.HTTP_201_CREATED)
def create_mission(mission: schemas.MissionCreate, db: Session = Depends(get_db)):
    """Create a new mission with targets"""
    return crud.create_mission(db=db, mission=mission)


@router.get("/", response_model=List[schemas.Mission])
def read_missions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """Get all missions"""
    missions = crud.get_missions(db, skip=skip, limit=limit)
    return missions


@router.get("/{mission_id}", response_model=schemas.Mission)
def read_mission(mission_id: int, db: Session = Depends(get_db)):
    """Get a specific mission by ID"""
    db_mission = crud.get_mission(db, mission_id=mission_id)
    if db_mission is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Mission not found"
        )
    return db_mission


@router.put("/{mission_id}/assign", response_model=schemas.Mission)
def assign_cat_to_mission(mission_id: int, assignment: schemas.MissionAssign, db: Session = Depends(get_db)):
    """Assign a cat to a mission"""
    db_mission = crud.assign_cat_to_mission(db, mission_id=mission_id, cat_id=assignment.cat_id)
    if db_mission is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot assign cat to mission. Cat may already have an active mission or mission/cat not found."
        )
    return db_mission


@router.delete("/{mission_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_mission(mission_id: int, db: Session = Depends(get_db)):
    """Delete a mission (only if not assigned to a cat)"""
    success = crud.delete_mission(db, mission_id=mission_id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete mission. Mission may be assigned to a cat or not found."
        )


@router.put("/targets/{target_id}", response_model=schemas.Target)
def update_target(target_id: int, target_update: schemas.TargetUpdate, db: Session = Depends(get_db)):
    """Update target notes or completion status"""
    db_target = crud.update_target(db, target_id=target_id, target_update=target_update)
    if db_target is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot update target. Target may be completed, mission may be completed, or target not found."
        )
    return db_target


@router.get("/targets/{target_id}", response_model=schemas.Target)
def read_target(target_id: int, db: Session = Depends(get_db)):
    """Get a specific target by ID"""
    db_target = crud.get_target(db, target_id=target_id)
    if db_target is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Target not found"
        )
    return db_target 