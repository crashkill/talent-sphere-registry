
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Users, UserPlus, Upload } from 'lucide-react';
import { Professional } from '../types/Professional';

interface DashboardProps {
  professionals: Professional[];
  onNavigate: (view: 'manual' | 'excel') => void;
}

const COLORS = [
  '#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b',
  '#ef4444', '#ec4899', '#84cc16', '#6366f1', '#f97316'
];

const Dashboard: React.FC<DashboardProps> = ({ professionals, onNavigate }) => {
  // Process data for pie chart
  const skillData = React.useMemo(() => {
    const skillCount = professionals.reduce((acc, professional) => {
      acc[professional.mainSkill] = (acc[professional.mainSkill] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(skillCount).map(([skill, count]) => ({
      name: skill,
      value: count,
      percentage: ((count / professionals.length) * 100).toFixed(1)
    }));
  }, [professionals]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-white/20">
          <p className="font-semibold text-slate-800">{data.name}</p>
          <p className="text-slate-600">
            {data.value} profissionais ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-slate-300 text-sm">Total de Profissionais</p>
              <p className="text-3xl font-bold text-white">{professionals.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-full">
              <UserPlus className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-slate-300 text-sm">Linguagens Diferentes</p>
              <p className="text-3xl font-bold text-white">{skillData.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-full">
              <Upload className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <p className="text-slate-300 text-sm">Áreas de Atuação</p>
              <p className="text-3xl font-bold text-white">
                {new Set(professionals.map(p => p.area)).size}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Distribuição de Profissionais por Linguagem Principal
        </h2>
        
        {skillData.length > 0 ? (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {skillData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  wrapperStyle={{ color: '#fff' }}
                  formatter={(value) => <span style={{ color: '#fff' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-16 w-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 text-lg">Nenhum profissional cadastrado ainda</p>
              <p className="text-slate-400">Comece adicionando profissionais para ver a distribuição</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('manual')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center space-x-3">
            <UserPlus className="h-6 w-6" />
            <span className="text-lg">Cadastrar Manualmente</span>
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('excel')}
          className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center space-x-3">
            <Upload className="h-6 w-6" />
            <span className="text-lg">Importar do Excel</span>
          </div>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Dashboard;
