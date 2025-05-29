
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard';
import ManualForm from '../components/ManualForm';
import ExcelImport from '../components/ExcelImport';
import WebGLBackground from '../components/WebGLBackground';
import MouseTrail from '../components/MouseTrail';
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      <WebGLBackground />
      <MouseTrail />
      
      {/* Glassmorphism overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10 backdrop-blur-[0.5px] z-5"></div>
      
      <div className="relative z-10">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-6"
        >
          <div className="max-w-7xl mx-auto">
            <motion.h1 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold text-white mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent leading-tight"
            >
              TechTalent Registry
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-slate-300 text-xl font-light tracking-wide"
            >
              Gerencie profissionais de TI com facilidade e elegância
            </motion.p>
            
            {/* Decorative line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100px" }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 mt-6"
            ></motion.div>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
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
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Index;
