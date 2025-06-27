import axios from 'axios';
import { SpyCat, SpyCatCreate, SpyCatUpdate } from '../types';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Spy Cats API
export const spyCatAPI = {
  // Get all spy cats
  getAll: async (): Promise<SpyCat[]> => {
    const response = await api.get('/spy-cats/');
    return response.data;
  },

  // Get a single spy cat
  getById: async (id: number): Promise<SpyCat> => {
    const response = await api.get(`/spy-cats/${id}`);
    return response.data;
  },

  // Create a new spy cat
  create: async (cat: SpyCatCreate): Promise<SpyCat> => {
    const response = await api.post('/spy-cats/', cat);
    return response.data;
  },

  // Update spy cat salary
  update: async (id: number, updates: SpyCatUpdate): Promise<SpyCat> => {
    const response = await api.put(`/spy-cats/${id}`, updates);
    return response.data;
  },

  // Delete a spy cat
  delete: async (id: number): Promise<void> => {
    await api.delete(`/spy-cats/${id}`);
  },

  // Get available spy cats (no active missions)
  getAvailable: async (): Promise<SpyCat[]> => {
    const response = await api.get('/spy-cats/available');
    return response.data;
  },
};

// Get cat breeds from TheCatAPI (for validation)
export const getCatBreeds = async (): Promise<string[]> => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data.map((breed: any) => breed.name);
  } catch (error) {
    console.error('Failed to fetch cat breeds:', error);
    return [
      'Abyssinian', 'American Bobtail', 'American Curl', 'American Shorthair',
      'Bengal', 'British Shorthair', 'Maine Coon', 'Persian', 'Ragdoll',
      'Russian Blue', 'Siamese', 'Sphynx'
    ];
  }
}; 