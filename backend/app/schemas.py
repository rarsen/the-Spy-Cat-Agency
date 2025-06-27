from pydantic import BaseModel, validator
from typing import List, Optional


# SpyCat schemas
class SpyCatBase(BaseModel):
    name: str
    years_of_experience: int
    breed: str
    salary: float

    @validator('years_of_experience')
    def validate_experience(cls, v):
        if v < 0:
            raise ValueError('Years of experience must be non-negative')
        return v

    @validator('salary')
    def validate_salary(cls, v):
        if v < 0:
            raise ValueError('Salary must be non-negative')
        return v


class SpyCatCreate(SpyCatBase):
    pass


class SpyCatUpdate(BaseModel):
    salary: float

    @validator('salary')
    def validate_salary(cls, v):
        if v < 0:
            raise ValueError('Salary must be non-negative')
        return v


class SpyCat(SpyCatBase):
    id: int

    class Config:
        from_attributes = True


# Target schemas
class TargetBase(BaseModel):
    name: str
    country: str
    notes: str = ""


class TargetCreate(TargetBase):
    pass


class TargetUpdate(BaseModel):
    notes: Optional[str] = None
    complete: Optional[bool] = None


class Target(TargetBase):
    id: int
    mission_id: int
    complete: bool

    class Config:
        from_attributes = True


# Mission schemas
class MissionBase(BaseModel):
    pass


class MissionCreate(MissionBase):
    targets: List[TargetCreate]

    @validator('targets')
    def validate_targets_count(cls, v):
        if len(v) < 1 or len(v) > 3:
            raise ValueError('Mission must have between 1 and 3 targets')
        return v


class MissionAssign(BaseModel):
    cat_id: int


class Mission(MissionBase):
    id: int
    cat_id: Optional[int]
    complete: bool
    cat: Optional[SpyCat]
    targets: List[Target]

    class Config:
        from_attributes = True 