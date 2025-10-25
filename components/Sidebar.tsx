import React from 'react';
import { DatabaseIcon, DashboardIcon, UploadIcon, FolderIcon, CheckIcon } from './icons';
import type { ViewType } from '../types';

interface SidebarProps {
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }> = ({ icon, label, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`flex items-center px-4 py-2.5 rounded-lg cursor-pointer transition-colors duration-200 ${
      isActive ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`}
  >
    {icon}
    <span className="ml-3 font-medium">{label}</span>
  </li>
);

const FormatItem: React.FC<{ icon: string; name: string; status: string; statusColor: string }> = ({ icon, name, status, statusColor }) => (
  <li className="flex justify-between items-center py-2 text-sm">
    <div className="flex items-center text-gray-700">
      <span className="mr-3 text-lg">{icon}</span>
      <span>{name}</span>
    </div>
    <span className={`font-medium ${statusColor}`}>{status}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex-col hidden md:flex">
      <div className="flex items-center mb-10">
        <div className="bg-indigo-600 text-white p-2 rounded-lg">
          <DatabaseIcon className="w-6 h-6" />
        </div>
        <div className="ml-3">
          <h1 className="text-xl font-bold text-gray-800">DataFlow</h1>
          <p className="text-xs text-gray-500">Conversor de Dados</p>
        </div>
      </div>

      <div className="flex-grow">
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Navegação</h2>
          <ul className="space-y-1">
            <NavItem icon={<DashboardIcon className="w-5 h-5" />} label="Dashboard" isActive={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
            <NavItem icon={<UploadIcon className="w-5 h-5" />} label="Upload & Converter" isActive={currentView === 'upload'} onClick={() => setCurrentView('upload')} />
            <NavItem icon={<FolderIcon className="w-5 h-5" />} label="Arquivos" isActive={currentView === 'files'} onClick={() => setCurrentView('files')} />
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Formatos Suportados</h2>
          <ul>
            <FormatItem icon="📄" name="JSON" status="✓ Upload" statusColor="text-green-600" />
            <FormatItem icon="📊" name="CSV" status="✓ Upload" statusColor="text-green-600" />
            <FormatItem icon="📦" name="Parquet" status="✓ Upload" statusColor="text-green-600" />
            <FormatItem icon="🕊️" name="Avro" status="✓ Upload" statusColor="text-green-600" />
          </ul>
        </div>
      </div>
      
      <div className="mt-auto pt-6 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
            U
          </div>
          <div className="ml-3">
            <p className="font-semibold text-sm text-gray-800">Usuário</p>
            <p className="text-xs text-gray-500">Manipulação de Dados</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;