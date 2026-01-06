import React, { useState } from 'react';
import { X, FileText, MapPin, Calendar } from 'lucide-react';
import { Button } from './Button';
import { Input } from './Input';
import { ProjectDetails } from '../types';

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (details: ProjectDetails) => void;
}

export const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [object, setObject] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [unit, setUnit] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (object && location && date && unit) {
      onSubmit({ object, location, date, unit });
      // Don't clear state immediately in case user re-opens to edit, 
      // but in this flow we typically move forward.
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 p-2 rounded-lg text-green-700">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Dados do Projeto</h3>
                <p className="text-xs text-gray-500">Defina as informações iniciais</p>
              </div>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
            <Input
              label="Objeto da Reforma/Serviço"
              placeholder="Ex: Pintura Geral e Troca de Pisos da Escola X"
              value={object}
              onChange={(e) => setObject(e.target.value)}
              icon={FileText}
              required
            />

            <Input
              label="Localização da Obra"
              placeholder="Ex: Rua das Flores, 123 - Centro, São Paulo/SP"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              icon={MapPin}
              required
            />

            <Input
              label="Unidade (OPM)"
              placeholder="Ex: 6ª Cia do 8º BPM/M"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              icon={FileText}
              required
            />

            <Input
              label="Data de Elaboração"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              icon={Calendar}
              required
            />

            <div className="pt-4 flex flex-row-reverse gap-3">
              <Button type="submit">
                Iniciar Projeto
              </Button>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};