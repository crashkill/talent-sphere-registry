
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/Dashboard';
import ManualForm from '../components/ManualForm';
import ExcelImport from '../components/ExcelImport';
import WebGLBackground from '../components/WebGLBackground';
import { Professional } from '../types/Professional';
import { createClient, SupabaseClient } from '@supabase/supabase-js'; // Importar Supabase

// Configurações do Supabase
const SUPABASE_URL = 'https://pwksgdjjkryqryqrvyja.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3a3NnZGpqa3J5cXJ5cXJ2eWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1NjAwNDgsImV4cCI6MjA2NDEzNjA0OH0.CbqU-Gx-QglerhxQzDjK6KFAi4CRLUl90LeKvDEKtbc';
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'manual' | 'excel'>('dashboard');
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para o carregamento
  const [error, setError] = useState<string | null>(null); // Estado para erros

  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: supabaseError } = await supabase
          .from('colaboradores') // Nome da tabela no Supabase
          .select('*'); // Seleciona todas as colunas

        if (supabaseError) {
          throw supabaseError;
        }

        if (data) {
          // O tipo 'Professional' já está alinhado com as colunas da tabela
          setProfessionals(data as Professional[]);
        }
      } catch (err: any) {
        console.error("Erro ao buscar profissionais do Supabase:", err);
        setError(err.message || 'Falha ao buscar dados.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []); // Executa apenas uma vez na montagem do componente

  // As funções saveProfessionals, addProfessional, addMultipleProfessionals
  // precisarão ser adaptadas para interagir com o Supabase se necessário.
  // Por enquanto, elas não afetarão a busca inicial de dados.
  const saveProfessionals = (newProfessionals: Professional[]) => {
    // Lógica para salvar no Supabase (a ser implementada se necessário)
    console.log("saveProfessionals chamada, mas não implementada para Supabase ainda.", newProfessionals);
    setProfessionals(newProfessionals); // Atualiza o estado localmente
    // localStorage.setItem('techTalentRegistry', JSON.stringify(newProfessionals)); // Remover ou adaptar
  };

  const addProfessional = (professional: Professional) => {
    // Lógica para adicionar no Supabase (a ser implementada se necessário)
    console.log("addProfessional chamada, mas não implementada para Supabase ainda.", professional);
    const updated = [...professionals, { ...professional, id: professional.id || Date.now().toString() }]; // Garante um ID
    saveProfessionals(updated);
  };

  const addMultipleProfessionals = (newProfessionals: Professional[]) => {
    // Lógica para adicionar múltiplos no Supabase (a ser implementada se necessário)
    console.log("addMultipleProfessionals chamada, mas não implementada para Supabase ainda.", newProfessionals);
    const updated = [...professionals, ...newProfessionals.map(p => ({ ...p, id: p.id || Date.now().toString() + Math.random() }))];
    saveProfessionals(updated);
  };

  // Renderização condicional baseada no estado de carregamento e erro
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <p className="text-white text-2xl">Carregando profissionais...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
        <p className="text-red-500 text-2xl">Erro ao carregar dados: {error}</p>
      </div>
    );
  }

  return (
    // O restante do JSX do componente permanece o mesmo
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative overflow-hidden">
      <WebGLBackground />
      
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
