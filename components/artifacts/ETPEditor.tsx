import React, { useState, useEffect } from 'react';
import { ProjectDetails, ServiceItem, DFDData, ETPData } from '../../types';
import { generateETPDefaults } from '../../utils/artifactDefaults';
import { generateETPPDF } from '../../utils/pdfGenerator';
import { FileDown } from 'lucide-react';

interface ETPEditorProps {
    projectDetails: ProjectDetails;
    services: ServiceItem[];
    dfdData: DFDData;
}

export const ETPEditor: React.FC<ETPEditorProps> = ({ projectDetails, services, dfdData }) => {
    const [data, setData] = useState<ETPData | null>(null);

    useEffect(() => {
        if (projectDetails && dfdData) {
            const defaults = generateETPDefaults(projectDetails, services, dfdData);
            setData(defaults);
        }
    }, [projectDetails, services, dfdData]);

    const handleChange = (field: keyof ETPData, value: string) => {
        if (data) {
            setData({ ...data, [field]: value });
        }
    };

    if (!data) return <div>Carregando...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-green-50 p-4 rounded-lg">
                <h3 className="text-green-900 font-medium">Editor de ETP</h3>
                <button
                    onClick={() => generateETPPDF(data)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                >
                    <FileDown className="mr-2 h-4 w-4" />
                    Aprovar e Baixar PDF
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Helper function to render textareas */}
                {([
                    ['needDescription', '1. Descrição da Necessidade'],
                    ['requirements', '2. Requisitos da Contratação'],
                    ['marketResearch', '3. Levantamento de Mercado'],
                    ['solutionDescription', '4. Descrição da Solução'],
                    ['quantityEstimate', '5. Estimativa de Quantidades'],
                    ['valueEstimate', '6. Estimativa do Valor'],
                    ['partitioningJustification', '7. Justificativa para Parcelamento'],
                    ['expectedResults', '8. Resultados Pretendidos'],
                    ['priorMeasures', '9. Providências Prévias'],
                    ['relatedHires', '10. Contratações Correlatas'],
                    ['environmentalImpacts', '11. Impactos Ambientais'],
                    ['viability', '12. Viabilidade'],
                ] as [keyof ETPData, string][]).map(([key, label]) => (
                    <div key={key}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                        <textarea
                            rows={4}
                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
                            value={data[key]}
                            onChange={(e) => handleChange(key, e.target.value)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
