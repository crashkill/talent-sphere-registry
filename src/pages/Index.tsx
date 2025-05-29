
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard';
import ManualForm from '../components/ManualForm';
import ExcelImport from '../components/ExcelImport';
import WebGLBackground from '../components/WebGLBackground';
import { Professional } from '../types/Professional';

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'manual' | 'excel'>('dashboard');
  const [professionals, setProfessionals] = useState<Professional[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('techTalentRegistry');
    if (stored) {
      setProfessionals(JSON.parse(stored));
    }
  }, []);

  const saveProfessionals = (newProfessionals: Professional[]) => {
    setProfessionals(newProfessionals);
    localStorage.setItem('techTalentRegistry', JSON.stringify(newProfessionals));
  };

  const addProfessional = (professional: Professional) => {
    const updated = [...professionals, { ...professional, id: Date.now().toString() }];
    saveProfessionals(updated);
  };

  const addMultipleProfessionals = (newProfessionals: Professional[]) => {
    const updated = [...professionals, ...newProfessionals.map(p => ({ ...p, id: Date.now().toString() + Math.random() }))];
    saveProfessionals(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <WebGLBackground />
      
      <div className="relative z-10">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-6"
        >
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              TechTalent Registry
            </h1>
            <p className="text-slate-300 text-lg">
              Gerencie profissionais de TI com facilidade e elegância
            </p>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-6 pb-6">
          {currentView === 'dashboard' && (
            <Dashboard 
              professionals={professionals}
              onNavigate={setCurrentView}
            />
          )}
          
          {currentView === 'manual' && (
            <ManualForm 
              onSubmit={addProfessional}
              onBack={() => setCurrentView('dashboard')}
            />
          )}
          
          {currentView === 'excel' && (
            <ExcelImport 
              onImport={addMultipleProfessionals}
              onBack={() => setCurrentView('dashboard')}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
