'use client';

import { useState, useEffect } from 'react';
import { SpyCat, SpyCatCreate } from '../types';
import { getCatBreeds } from '../lib/api';

interface SpyCatFormProps {
  cat?: SpyCat;
  onSubmit: (cat: SpyCatCreate) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function SpyCatForm({ cat, onSubmit, onCancel, isLoading }: SpyCatFormProps) {
  const [formData, setFormData] = useState<SpyCatCreate>({
    name: cat?.name || '',
    years_of_experience: cat?.years_of_experience || 0,
    breed: cat?.breed || '',
    salary: cat?.salary || 0,
  });
  
  const [breeds, setBreeds] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        const catBreeds = await getCatBreeds();
        setBreeds(catBreeds);
      } catch (error) {
        console.error('Failed to load cat breeds:', error);
      }
    };

    loadBreeds();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (formData.years_of_experience < 0) {
      newErrors.years_of_experience = 'Years of experience must be non-negative';
    }

    if (!formData.breed) {
      newErrors.breed = 'Breed is required';
    }

    if (formData.salary < 0) {
      newErrors.salary = 'Salary must be non-negative';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (field: keyof SpyCatCreate, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-6">
        {cat ? 'Edit Spy Cat' : 'Add New Spy Cat'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.name ? 'border-red-300' : ''
            }`}
            placeholder="Enter cat name"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        {/* Years of Experience */}
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
            Years of Experience
          </label>
          <input
            type="number"
            id="experience"
            min="0"
            value={formData.years_of_experience}
            onChange={(e) => handleChange('years_of_experience', parseInt(e.target.value) || 0)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.years_of_experience ? 'border-red-300' : ''
            }`}
          />
          {errors.years_of_experience && (
            <p className="mt-1 text-sm text-red-600">{errors.years_of_experience}</p>
          )}
        </div>

        {/* Breed */}
        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
            Breed
          </label>
          <select
            id="breed"
            value={formData.breed}
            onChange={(e) => handleChange('breed', e.target.value)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.breed ? 'border-red-300' : ''
            }`}
          >
            <option value="">Select a breed</option>
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
          {errors.breed && <p className="mt-1 text-sm text-red-600">{errors.breed}</p>}
        </div>

        {/* Salary */}
        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salary ($)
          </label>
          <input
            type="number"
            id="salary"
            min="0"
            step="0.01"
            value={formData.salary}
            onChange={(e) => handleChange('salary', parseFloat(e.target.value) || 0)}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
              errors.salary ? 'border-red-300' : ''
            }`}
            placeholder="0.00"
          />
          {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary}</p>}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {isLoading ? 'Saving...' : cat ? 'Update' : 'Add Cat'}
          </button>
        </div>
      </form>
    </div>
  );
} 