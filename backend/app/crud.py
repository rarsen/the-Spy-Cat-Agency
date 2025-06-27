from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional


# SpyCat CRUD operations
def get_spy_cat(db: Session, cat_id: int) -> Optional[models.SpyCat]:
    return db.query(models.SpyCat).filter(models.SpyCat.id == cat_id).first()


def get_spy_cats(db: Session, skip: int = 0, limit: int = 100) -> List[models.SpyCat]:
    return db.query(models.SpyCat).offset(skip).limit(limit).all()


def create_spy_cat(db: Session, cat: schemas.SpyCatCreate) -> models.SpyCat:
    db_cat = models.SpyCat(**cat.dict())
    db.add(db_cat)
    db.commit()
    db.refresh(db_cat)
    return db_cat


def update_spy_cat(db: Session, cat_id: int, cat_update: schemas.SpyCatUpdate) -> Optional[models.SpyCat]:
    db_cat = get_spy_cat(db, cat_id)
    if db_cat:
        db_cat.salary = cat_update.salary
        db.commit()
        db.refresh(db_cat)
    return db_cat


def delete_spy_cat(db: Session, cat_id: int) -> bool:
    db_cat = get_spy_cat(db, cat_id)
    if db_cat:
        db.delete(db_cat)
        db.commit()
        return True
    return False


def get_available_spy_cats(db: Session) -> List[models.SpyCat]:
    """Get spy cats that don't have active missions"""
    return db.query(models.SpyCat).filter(
        ~models.SpyCat.missions.any(models.Mission.complete == False)
    ).all()


# Mission CRUD operations
def get_mission(db: Session, mission_id: int) -> Optional[models.Mission]:
    return db.query(models.Mission).filter(models.Mission.id == mission_id).first()


def get_missions(db: Session, skip: int = 0, limit: int = 100) -> List[models.Mission]:
    return db.query(models.Mission).offset(skip).limit(limit).all()


def create_mission(db: Session, mission: schemas.MissionCreate) -> models.Mission:
    db_mission = models.Mission()
    db.add(db_mission)
    db.commit()
    db.refresh(db_mission)
    
    
    for target_data in mission.targets:
        db_target = models.Target(**target_data.dict(), mission_id=db_mission.id)
        db.add(db_target)
    
    db.commit()
    db.refresh(db_mission)
    return db_mission


def assign_cat_to_mission(db: Session, mission_id: int, cat_id: int) -> Optional[models.Mission]:
    db_mission = get_mission(db, mission_id)
    db_cat = get_spy_cat(db, cat_id)
    
    if not db_mission or not db_cat:
        return None
    
    
    active_mission = db.query(models.Mission).filter(
        models.Mission.cat_id == cat_id,
        models.Mission.complete == False
    ).first()
    
    if active_mission:
        return None 
    
    db_mission.cat_id = cat_id
    db.commit()
    db.refresh(db_mission)
    return db_mission


def delete_mission(db: Session, mission_id: int) -> bool:
    db_mission = get_mission(db, mission_id)
    if db_mission and db_mission.cat_id is None: 
        db.delete(db_mission)
        db.commit()
        return True
    return False


def update_mission_completion(db: Session, mission_id: int) -> Optional[models.Mission]:
    """Check and update mission completion status based on targets"""
    db_mission = get_mission(db, mission_id)
    if db_mission:
        all_targets_complete = all(target.complete for target in db_mission.targets)
        db_mission.complete = all_targets_complete
        db.commit()
        db.refresh(db_mission)
    return db_mission


# Target CRUD operations
def get_target(db: Session, target_id: int) -> Optional[models.Target]:
    return db.query(models.Target).filter(models.Target.id == target_id).first()


def update_target(db: Session, target_id: int, target_update: schemas.TargetUpdate) -> Optional[models.Target]:
    db_target = get_target(db, target_id)
    if not db_target:
        return None
    
    
    if db_target.complete or db_target.mission.complete:
        return None  
    
    if target_update.notes is not None:
        db_target.notes = target_update.notes
    
    if target_update.complete is not None:
        db_target.complete = target_update.complete
    
    db.commit()
    db.refresh(db_target)
    
    
    update_mission_completion(db, db_target.mission_id)
    
    return db_target 