import React, { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist';

// Configure worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const CDHUUpdate: React.FC = () => {
    const navigate = useNavigate();
    const [isDragging, setIsDragging] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState<{ updated: number; version: string } | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type === 'application/pdf') {
            await processPDF(files[0]);
        } else {
            setError('Por favor, envie um arquivo PDF válido.');
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            await processPDF(e.target.files[0]);
        }
    };

    const processPDF = async (file: File) => {
        setIsProcessing(true);
        setError(null);
        setProgress(0);
        setResult(null);

        try {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const numPages = pdf.numPages;

            const newPrices: Record<string, number> = {};
            let extractedVersion = 'Desconhecida';

            // Regex for CDHU codes: XX.XX.XXX (e.g., 18.06.142)
            // This is a naive implementation trying to find patterns
            const codeRegex = /(\d{2}\.\d{2}\.\d{3})/g;

            for (let i = 1; i <= numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const textItems = textContent.items.map((item: any) => item.str).join(' ');

                // Try to find version in the first few pages
                if (i <= 3) {
                    const versionMatch = textItems.match(/BOLETIM\s*(\d+)/i);
                    if (versionMatch) {
                        extractedVersion = `CDHU ${versionMatch[1]}`;
                    }
                }

                // Simple parsing strategy:
                // Split by lines or chunks, look for Code ... Price
                // This is tricky with raw PDF text which often loses structure.
                // We act differently: we search for the code, then look for the next valid number that looks like a price.

                const lines = textItems.split(/(?=\d{2}\.\d{2}\.\d{3})/); // Split starting with code

                lines.forEach(line => {
                    const codeMatch = line.match(/(\d{2}\.\d{2}\.\d{3})/);
                    if (codeMatch) {
                        const code = codeMatch[1];
                        // Find all numbers in the rest of the string
                        // Prices typically have , as decimal. 1.234,56
                        const priceMatches = line.matchAll(/(\d{1,3}(?:\.\d{3})*,\d{2})/g);
                        const prices = Array.from(priceMatches).map(m => parseFloat(m[1].replace('.', '').replace(',', '.')));

                        // Heuristic: The price is usually the last number in the line or specific position?
                        // In CDHU tables: Code | Desc | Unit | Price
                        // So we take the last valid number found associated with this code block
                        if (prices.length > 0) {
                            const price = prices[prices.length - 1]; // Assumption: unit price is last or largest? usually defined position. 
                            // Let's assume the last number found in the text chunk for this item is the price.
                            if (price > 0) newPrices[code] = price;
                        }
                    }
                });

                setProgress(Math.round((i / numPages) * 100));
            }

            // Save to LocalStorage
            const updateData = {
                version: extractedVersion !== 'Desconhecida' ? extractedVersion : `Upload em ${new Date().toLocaleDateString()}`,
                date: new Date().toISOString(),
                prices: newPrices
            };

            localStorage.setItem('cdhu_update_data', JSON.stringify(updateData));

            // Also trigger a custom event so other components can reload
            window.dispatchEvent(new Event('cdhu_catalog_updated'));

            setResult({
                updated: Object.keys(newPrices).length,
                version: updateData.version
            });

        } catch (err) {
            console.error(err);
            setError('Erro ao processar o arquivo. Verifique se é um PDF legível (não escaneado).');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-2 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Voltar ao Dashboard
                </button>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                        <RefreshCw size={28} />
                    </div>
                    Atualização CDHU
                </h1>
                <p className="mt-1 text-gray-500">Mantenha seu catálogo atualizado importando os boletins oficiais em PDF.</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">

                {!result ? (
                    <div
                        className={`border-3 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${isDragging ? 'border-purple-500 bg-purple-50' : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            accept=".pdf"
                            onChange={handleFileChange}
                        />

                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
                                <Upload size={32} />
                            </div>
                            <div>
                                <p className="text-lg font-bold text-gray-900">Clique ou arraste o PDF aqui</p>
                                <p className="text-sm text-gray-500 mt-1">Suporta: Boletins CDHU (PDF Pesquisável)</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-12 bg-green-50 rounded-xl border border-green-100">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 text-green-600 rounded-full mb-4">
                            <CheckCircle size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-green-800">Atualização Concluída!</h3>
                        <p className="text-green-700 mt-2">
                            Versão detectada: <strong>{result.version}</strong>
                        </p>
                        <p className="text-green-600">
                            {result.updated} itens foram atualizados no sistema.
                        </p>

                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                            >
                                Voltar ao Início
                            </button>
                            <button
                                onClick={() => setResult(null)}
                                className="px-6 py-2 bg-white text-green-700 font-medium rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
                            >
                                Novo Upload
                            </button>
                        </div>
                    </div>
                )}

                {isProcessing && (
                    <div className="mt-8">
                        <div className="flex justify-between text-sm font-medium text-gray-700 mb-2">
                            <span>Processando arquivo...</span>
                            <span>{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-700 rounded-lg flex items-center gap-3">
                        <AlertCircle size={20} className="shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <h4 className="font-bold text-blue-900 mb-2">Como funciona?</h4>
                    <p className="text-sm text-blue-800">
                        O sistema lê o código e o preço dos serviços diretamente do PDF oficial. Basta fazer o upload.
                    </p>
                </div>
                <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                    <h4 className="font-bold text-orange-900 mb-2">Atenção</h4>
                    <p className="text-sm text-orange-800">
                        Certifique-se que o PDF não é uma imagem digitalizada (scanner). O texto precisa ser selecionável.
                    </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-gray-900 mb-2">Persistência</h4>
                    <p className="text-sm text-gray-600">
                        Os dados ficam salvos no seu navegador para uso futuro.
                    </p>
                </div>
            </div>
        </div>
    );
};
