import React from 'react';
import { ArrowLeft, FileText, FileSpreadsheet, Layers, CheckCircle2, ShieldCheck, MapPin, Calendar, MousePointer2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Help: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors mb-4"
            >
                <ArrowLeft size={20} className="mr-2" />
                Voltar ao Dashboard
            </button>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white">
                    <h1 className="text-3xl font-bold mb-2">Guia Rápido MeMori Fácil</h1>
                    <p className="text-blue-100 text-lg">Tudo o que você precisa saber para criar documentos perfeitos.</p>
                </div>

                <div className="p-8 space-y-12">

                    {/* Section 1: Introduction */}
                    <section>
                        <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
                                <MousePointer2 size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">1. Como Funciona o Fluxo?</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    O MeMori Fácil organiza seu trabalho em 3 etapas lógicas. Você deve completar uma para desbloquear a próxima:
                                </p>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-center gap-2 mb-2 font-semibold text-blue-700">
                                            <FileText size={18} /> 1. Memorial
                                        </div>
                                        <p className="text-xs text-gray-500">Defina o objeto, local e adicione os serviços. Gera o documento técnico base.</p>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-center gap-2 mb-2 font-semibold text-green-700">
                                            <FileSpreadsheet size={18} /> 2. Orçamento
                                        </div>
                                        <p className="text-xs text-gray-500">Gera a planilha de quantitativos e custos automaticamente baseada no memorial.</p>
                                    </div>
                                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                                        <div className="flex items-center gap-2 mb-2 font-semibold text-indigo-700">
                                            <ShieldCheck size={18} /> 3. Artefatos
                                        </div>
                                        <p className="text-xs text-gray-500">Cria o DFD e ETP (Lei 14.133/21) usando os dados compilados.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Section 2: Creating a Project */}
                    <section>
                        <div className="flex items-start gap-4">
                            <div className="bg-green-100 p-3 rounded-xl text-green-600">
                                <FileText size={28} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900 mb-3">2. Criando um Memorial Descritivo</h2>
                                <ol className="list-decimal list-inside space-y-4 text-gray-600">
                                    <li className="pl-2">
                                        <span className="font-medium text-gray-900">Inicie um Novo Projeto:</span> Clique em "Novo Projeto" no dashboard.
                                    </li>
                                    <li className="pl-2">
                                        <span className="font-medium text-gray-900">Preencha os Detalhes:</span>
                                        <ul className="list-disc list-inside pl-6 mt-2 space-y-1 text-sm bg-gray-50 p-3 rounded-lg border border-gray-200">
                                            <li><strong>Objeto:</strong> O que será contratado (ex: "Reforma da Escola X").</li>
                                            <li><strong>Local:</strong> Endereço completo da obra.</li>
                                            <li><strong>Data Base:</strong> Data de referência para os preços.</li>
                                        </ul>
                                    </li>
                                    <li className="pl-2">
                                        <span className="font-medium text-gray-900">Adicione Serviços:</span> Escolha serviços da base (CDHU/FDE) ou crie manualmente. Defina a quantidade (área, unidades).
                                    </li>
                                    <li className="pl-2">
                                        <span className="font-medium text-gray-900">Gere o PDF:</span> Clique em <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">Gerar PDF</span> para baixar o documento final.
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </section>

                    <hr className="border-gray-100" />

                    {/* Section 3: Digital Artifacts */}
                    <section>
                        <div className="flex items-start gap-4">
                            <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
                                <Layers size={28} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-3">3. Gerando DFD e ETP</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Para atender à Nova Lei de Licitações (14.133/2021), você precisa destes documentos. O sistema preenche 90% para você.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex gap-4 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                                        <div className="min-w-[40px] font-bold text-indigo-500">DFD</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Documento de Formalização de Demanda</h4>
                                            <p className="text-sm text-gray-600 mt-1">Preenchido com a justificativa e estimativa de valor do orçamento. Revise o texto e aprove.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 bg-purple-50 rounded-xl border border-purple-100">
                                        <div className="min-w-[40px] font-bold text-purple-500">ETP</div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">Estudo Técnico Preliminar</h4>
                                            <p className="text-sm text-gray-600 mt-1">O documento mais complexo. O sistema gera as 12 seções obrigatórias baseando-se no que você colocou no DFD e Memorial. Apenas refine os textos específicos.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 flex gap-4">
                        <div className="text-yellow-600">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-yellow-800 mb-1">Dica de Ouro</h4>
                            <p className="text-yellow-700 text-sm">
                                Sempre mantenha os dados do Memorial atualizados. Se você alterar uma quantidade no Memorial, lembre-se de gerar novamente o Orçamento e os Artefatos para que os valores batam.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
