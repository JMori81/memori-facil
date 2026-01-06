import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Search,
  Bell,
  LogOut,
  FileText,
  FileSpreadsheet
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DataSynchronizer } from './DataSynchronizer';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  onNewMemorial: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onLogout, onNewMemorial }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  ];

  const toolsItems = [];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen bg-[#f3f4f6] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e3a8a] text-white flex flex-col flex-shrink-0 transition-all duration-300">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-lg">
            <FileText className="text-white" size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">MeMori Fácil</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive(item.path)
                ? 'bg-white/10 text-white'
                : 'text-blue-100 hover:bg-white/5 hover:text-white'
                }`}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-900/50">
            <div className="h-10 w-10 rounded-full bg-orange-200 flex items-center justify-center text-orange-800 font-bold">
              EC
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Eng. Carlos</p>
              <p className="text-xs text-blue-200 truncate">Plano Pro</p>
            </div>
            <button onClick={onLogout} className="text-blue-200 hover:text-white">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 lg:px-8">
          <div className="flex-1" />

          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
            </button>
            <div className="h-6 w-px bg-gray-200" />
            <button
              onClick={onNewMemorial}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#1e3a8a] hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <PlusCircle size={18} className="mr-2" />
              Novo Memorial
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-[#f3f4f6] p-6 lg:p-8">
          {children}
        </div>
      </main>
      <DataSynchronizer />
    </div>
  );
};