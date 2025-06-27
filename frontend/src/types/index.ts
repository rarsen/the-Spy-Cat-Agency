export interface SpyCat {
  id: number;
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}

export interface SpyCatCreate {
  name: string;
  years_of_experience: number;
  breed: string;
  salary: number;
}

export interface SpyCatUpdate {
  salary: number;
}

export interface Target {
  id: number;
  mission_id: number;
  name: string;
  country: string;
  notes: string;
  complete: boolean;
}

export interface Mission {
  id: number;
  cat_id?: number;
  complete: boolean;
  cat?: SpyCat;
  targets: Target[];
} 