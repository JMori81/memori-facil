import React from 'react';
import {
  CheckCircle2,
  Layers,
  FileSpreadsheet,
  ArrowRight,
  FileText,
  Lock,
  MapPin,
  Calendar,
  PlusCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceItem, ProjectDetails } from '../types';

interface DashboardProps {
  onNewMemorial: () => void;
  services?: ServiceItem[];
  memorialGenerated?: boolean;
  projectDetails?: ProjectDetails | null;
  onAddServiceClick?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNewMemorial,
  services = [],
  memorialGenerated = false,
  projectDetails,
  onAddServiceClick
}) => {
  const navigate = useNavigate();

  const stats = [
    {
      label: 'Memoriais Concluídos',
      value: '12',
      icon: CheckCircle2,
      color: 'bg-green-50 text-green-700'
    },
    {
      label: 'Serviços Cadastrados',
      value: '48',
      icon: Layers,
      color: 'bg-orange-50 text-orange-700'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Visão Geral</h1>
        <p className="mt-1 text-gray-500">Bem-vindo ao seu painel de controle.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main Column: Active Project Workspace (66%) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Memorial Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col h-full">
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {projectDetails ? 'Projeto Ativo' : 'Área de Trabalho'}
                  </h2>
                  <p className="text-sm text-gray-500">Gerenciamento do Memorial e Artefatos</p>
                </div>
              </div>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${services.length > 0 ? 'bg-blue-50 text-blue-700 border-blue-100' : 'bg-gray-50 text-gray-500 border-gray-100'}`}>
                {services.length} itens
              </span>
            </div>

            {/* Project Header Info */}
            {projectDetails && (
              <div className="px-8 py-5 bg-blue-50/50 border-b border-gray-100 items-start">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1">Objeto do Contrato</p>
                    <p className="text-base font-medium text-gray-900 leading-snug">{projectDetails.object}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin size={16} className="text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-0.5">Localização</p>
                        <p className="text-sm text-gray-700">{projectDetails.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar size={16} className="text-blue-500 mt-0.5" />
                      <div>
                        <p className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-0.5">Data Base</p>
                        <p className="text-sm text-gray-700">{new Date(projectDetails.date).toLocaleDateString('pt-BR')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="p-8 flex-1 flex flex-col">
              {services.length > 0 ? (
                <div className="space-y-6 flex-1 flex flex-col">

                  {/* Table */}
                  <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Item</th>
                          <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Serviço</th>
                          <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Quant.</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {services.slice(0, 5).map((item, idx) => ( // Show only first 5 items
                          <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-3 text-sm text-gray-500">{idx + 1}</td>
                            <td className="px-6 py-3 text-sm text-gray-900 font-medium">{item.name}</td>
                            <td className="px-6 py-3 text-sm text-right text-gray-600 font-medium">{item.area.toFixed(2)} {item.unit}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {services.length > 5 && (
                      <div className="bg-gray-50 px-6 py-2 text-center border-t border-gray-200">
                        <span className="text-xs text-gray-500">e mais {services.length - 5} itens...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-start">
                    <button
                      onClick={onAddServiceClick}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                    >
                      <PlusCircle className="mr-2 h-4 w-4 text-blue-600" />
                      Adicionar Serviço
                    </button>
                  </div>

                  {/* Workflow Steps */}
                  <div className="pt-6 mt-auto border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-900 mb-4">Fluxo de Trabalho</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        onClick={() => navigate('/memorial')}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${memorialGenerated
                          ? 'border-green-200 bg-green-50 text-green-700'
                          : 'border-blue-600 bg-blue-600 text-white shadow-md'
                          }`}
                      >
                        <FileText size={24} className="mb-2" />
                        <span className="text-sm font-bold">1. Memorial</span>
                        <span className="text-xs opacity-80 mt-1">{memorialGenerated ? 'Concluído' : 'Gerar Agora'}</span>
                      </button>

                      <button
                        onClick={() => navigate('/budget')}
                        disabled={!memorialGenerated}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${!memorialGenerated
                          ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                          : 'border-blue-600 bg-blue-600 text-white shadow-md hover:bg-blue-700'
                          }`}
                      >
                        {/* Icon logic for button 2 */}
                        {!memorialGenerated ? <Lock size={24} className="mb-2" /> : <FileSpreadsheet size={24} className="mb-2" />}
                        <span className="text-sm font-bold">2. Orçamento</span>
                        <span className="text-xs opacity-80 mt-1">Planilha</span>
                      </button>

                      <button
                        onClick={() => navigate('/artifacts')}
                        disabled={!memorialGenerated}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${!memorialGenerated
                          ? 'border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed'
                          : 'border-indigo-600 bg-indigo-600 text-white shadow-md hover:bg-indigo-700'
                          }`}
                      >
                        {!memorialGenerated ? <Lock size={24} className="mb-2" /> : <FileText size={24} className="mb-2" />}
                        <span className="text-sm font-bold">3. Artefatos</span>
                        <span className="text-xs opacity-80 mt-1">DFD e ETP</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 flex flex-col items-center justify-center h-full">
                  <div className="bg-gray-100 p-4 rounded-full mb-4">
                    <Layers size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">Comece seu projeto</h3>
                  <p className="mt-2 text-sm text-gray-500 max-w-sm">
                    Adicione serviços manualmente ou importe dados para gerar seus documentos automaticamente.
                  </p>
                  <div className="mt-8">
                    <button
                      onClick={projectDetails ? onAddServiceClick : onNewMemorial}
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-all hover:scale-105"
                    >
                      <PlusCircle className="mr-2 h-5 w-5" />
                      {projectDetails ? 'Adicionar Primeiro Serviço' : 'Iniciar Novo Projeto'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Column (33%) */}
        <div className="space-y-6">

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color.replace('bg-', 'text-').split(' ')[0]}`}>
                  <stat.icon size={20} className={stat.color.split(' ')[1]} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Acesso Rápido</h3>
            <div className="space-y-3">
              <button onClick={onNewMemorial} className="w-full group p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all flex items-center gap-3 text-left">
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <PlusCircle size={18} />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-gray-900">Novo Projeto</span>
                </div>
              </button>

              <button onClick={() => navigate('/cdhu-update')} className="w-full group p-3 rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all flex items-center gap-3 text-left">
                <div className="bg-purple-100 p-2 rounded-lg text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Layers size={18} />
                </div>
                <div className="flex-1">
                  <span className="block text-sm font-semibold text-gray-900">Atualizar CDHU</span>
                </div>
              </button>

            </div>
          </div>

          {/* Help / Tips */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl shadow-md p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="bg-white/20 w-fit p-2 rounded-lg mb-4">
                <ArrowRight size={20} className="text-white" />
              </div>
              <h3 className="text-lg font-bold mb-2">Precisa de Ajuda?</h3>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                Confira nosso guia rápido de como elaborar um Memorial Descritivo perfeito.
              </p>
              <button
                onClick={() => navigate('/help')}
                className="text-sm font-semibold bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Ver Documentação
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          </div>

        </div>
      </div>
    </div>
  );
};