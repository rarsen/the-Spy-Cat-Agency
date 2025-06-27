'use client';

import { useState, useEffect } from 'react';
import { SpyCat, SpyCatCreate, SpyCatUpdate } from '../types';
import { spyCatAPI } from '../lib/api';
import SpyCatList from '../components/SpyCatList';
import SpyCatForm from '../components/SpyCatForm';

export default function Home() {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCat, setEditingCat] = useState<SpyCat | null>(null);
  const [error, setError] = useState<string>('');

  
  useEffect(() => {
    loadCats();
  }, []);

  const loadCats = async () => {
    try {
      setLoading(true);
      const data = await spyCatAPI.getAll();
      setCats(data);
      setError('');
    } catch (err) {
      setError('Failed to load spy cats. Please try again.');
      console.error('Error loading cats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCat = async (catData: SpyCatCreate) => {
    try {
      const newCat = await spyCatAPI.create(catData);
      setCats(prev => [...prev, newCat]);
      setShowForm(false);
      setError('');
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Failed to create spy cat';
      setError(message);
      console.error('Error creating cat:', err);
    }
  };

  const handleEditCat = async (catData: SpyCatCreate) => {
    if (!editingCat) return;
    
    try {
      const updateData: SpyCatUpdate = { salary: catData.salary };
      const updatedCat = await spyCatAPI.update(editingCat.id, updateData);
      setCats(prev => prev.map(cat => 
        cat.id === editingCat.id ? updatedCat : cat
      ));
      setEditingCat(null);
      setShowForm(false);  
      setError('');
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Failed to update spy cat';
      setError(message);
      console.error('Error updating cat:', err);
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      await spyCatAPI.delete(id);
      setCats(prev => prev.filter(cat => cat.id !== id));
      setError('');
    } catch (err: any) {
      const message = err.response?.data?.detail || 'Failed to delete spy cat';
      setError(message);
      console.error('Error deleting cat:', err);
    }
  };

  const handleEditClick = (cat: SpyCat) => {
    setEditingCat(cat);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingCat(null);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-bold text-gray-900">Spy Cat Management</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your spy cats, their missions, and operational details.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add Spy Cat
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Spy Cats List */}
        <div className="lg:col-span-1">
          <SpyCatList
            cats={cats}
            onEdit={handleEditClick}
            onDelete={handleDeleteCat}
            isLoading={loading}
          />
        </div>

        {/* Form */}
        {showForm && (
          <div className="lg:col-span-1">
            <SpyCatForm
              cat={editingCat || undefined}
              onSubmit={editingCat ? handleEditCat : handleAddCat}
              onCancel={handleCancelForm}
            />
          </div>
        )}
      </div>
    </div>
  );
} 