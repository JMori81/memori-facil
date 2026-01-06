import React, { useState, useEffect } from 'react';
import { ProjectDetails, ServiceItem, DFDData } from '../../types';
import { generateDFDDefaults } from '../../utils/artifactDefaults';
import { generateDFDPDF } from '../../utils/pdfGenerator';
import { FileDown, Save } from 'lucide-react';

interface DFDEditorProps {
    projectDetails: ProjectDetails;
    services: ServiceItem[];
    onComplete: (data: DFDData) => void;
}

export const DFDEditor: React.FC<DFDEditorProps> = ({ projectDetails, services, onComplete }) => {
    const [data, setData] = useState<DFDData | null>(null);

    useEffect(() => {
        if (projectDetails) {
            const defaults = generateDFDDefaults(projectDetails, services);
            setData(defaults);
        }
    }, [projectDetails, services]);

    const handleChange = (field: keyof DFDData, value: any) => {
        if (data) {
            setData({ ...data, [field]: value });
        }
    };

    const handleDownload = () => {
        if (data) {
            generateDFDPDF(data);
            onComplete(data); // Notify parent that DFD is ready/downloaded
        }
    };

    if (!data) return <div>Carregando...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-blue-50 p-4 rounded-lg">
                <h3 className="text-blue-900 font-medium">Editor de DFD</h3>
                <button
                    onClick={handleDownload}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                    <FileDown className="mr-2 h-4 w-4" />
                    Aprovar e Baixar PDF
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Setor Requisitante</label>
                    <input
                        type="text"
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={data.sector}
                        onChange={(e) => handleChange('sector', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descrição do Objeto</label>
                    <textarea
                        rows={2}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={data.objectDescription}
                        onChange={(e) => handleChange('objectDescription', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Justificativa da Necessidade</label>
                    <textarea
                        rows={4}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={data.justification}
                        onChange={(e) => handleChange('justification', e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alinhamento Estratégico</label>
                    <textarea
                        rows={3}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                        value={data.strategicAlignment}
                        onChange={(e) => handleChange('strategicAlignment', e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Estimativa de Valor (R$)</label>
                        <input
                            type="text"
                            disabled
                            className="w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border text-gray-500"
                            value={`R$ ${data.estimatedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cronograma Desejado</label>
                        <input
                            type="text"
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            value={data.expectedTimeline}
                            onChange={(e) => handleChange('expectedTimeline', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
