import React, { useState } from 'react';
import { ProjectDetails, ServiceItem, DFDData } from '../types';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { DFDEditor } from '../components/artifacts/DFDEditor';
import { ETPEditor } from '../components/artifacts/ETPEditor';

interface ArtifactsProps {
    projectDetails: ProjectDetails | null;
    services: ServiceItem[];
}

export const Artifacts: React.FC<ArtifactsProps> = ({ projectDetails, services }) => {
    const [step, setStep] = useState<'dfd' | 'etp'>('dfd');
    const [dfdData, setDfdData] = useState<DFDData | null>(null);

    if (!projectDetails) {
        return (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
                <p className="text-xl font-medium">Nenhum projeto selecionado.</p>
                <p className="mt-2 text-sm">Por favor, inicie ou selecione um projeto no dashboard.</p>
            </div>
        );
    }

    const handleDFDComplete = (data: DFDData) => {
        setDfdData(data);
    };

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            {/* Header with Steps */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Artefatos Digitais</h1>
                    <p className="mt-1 text-gray-500">Geração de documentos oficiais (DFD e ETP) baseados no projeto.</p>
                </div>

                <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-lg border border-gray-100">
                    <button
                        onClick={() => setStep('dfd')}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${step === 'dfd'
                                ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        1. DFD
                    </button>
                    <ArrowRight size={16} className="text-gray-300" />
                    <button
                        onClick={() => {
                            if (dfdData) setStep('etp');
                        }}
                        disabled={!dfdData}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${step === 'etp'
                                ? 'bg-white text-green-600 shadow-sm border border-gray-200'
                                : !dfdData ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        2. ETP
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-6 md:p-8">
                    {step === 'dfd' ? (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-blue-500 pl-3">
                                    Documento de Formalização de Demanda (DFD)
                                </h2>
                                <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full border border-blue-100">
                                    Fase 1
                                </span>
                            </div>

                            <DFDEditor
                                projectDetails={projectDetails}
                                services={services}
                                onComplete={handleDFDComplete}
                            />

                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setStep('etp')}
                                    disabled={!dfdData}
                                    className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${!dfdData ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                >
                                    Próximo: Estudo Técnico Preliminar
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </div>
                            {!dfdData && (
                                <p className="text-xs text-right text-orange-500">
                                    * Gere/Baixe o PDF do DFD para avançar.
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900 border-l-4 border-green-500 pl-3">
                                    Estudo Técnico Preliminar (ETP)
                                </h2>
                                <span className="text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full border border-green-100">
                                    Fase 2
                                </span>
                            </div>

                            {dfdData ? (
                                <ETPEditor
                                    projectDetails={projectDetails}
                                    services={services}
                                    dfdData={dfdData}
                                />
                            ) : (
                                <div className="text-center py-10 text-red-500">Erro: Dados do DFD ausentes. Volte e gere o DFD.</div>
                            )}

                            <div className="flex justify-between pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setStep('dfd')}
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Voltar para DFD
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
