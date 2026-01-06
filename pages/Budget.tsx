import React from 'react';
import * as XLSX from 'xlsx';
import { ServiceItem, ProjectDetails } from '../types';
import { FileSpreadsheet, Download, Printer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BudgetProps {
    services: ServiceItem[];
    projectDetails: ProjectDetails | null;
}

export const Budget: React.FC<BudgetProps> = ({ services, projectDetails }) => {
    const navigate = useNavigate();

    // Calculations
    const totalMaterial = services.reduce((acc, item) => acc + (item.materialPrice * item.area), 0);
    const totalLabor = services.reduce((acc, item) => acc + (item.laborPrice * item.area), 0);
    const totalGeneral = totalMaterial + totalLabor;

    const formatCurrency = (val: number) => {
        return `R$ ${val.toFixed(2).replace('.', ',')}`;
    };

    const formatDate = () => {
        if (projectDetails?.date) {
            return new Date(projectDetails.date).toLocaleDateString('pt-BR');
        }
        const today = new Date();
        return today.toLocaleDateString('pt-BR');
    };

    const handleExportExcel = () => {
        const wb = XLSX.utils.book_new();

        // Headers
        const wsData = [
            ['SECRETARIA DA SEGURANÇA PÚBLICA'],
            ['POLÍCIA MILITAR DO ESTADO DE SÃO PAULO'],
            ['DIRETORIA DE FINANÇAS - CENTRO INTEGRADO DE APOIO PATRIMONIAL'],
            ['ORÇAMENTO ESTIMATIVO'],
            [],
            ['ASSUNTO:', projectDetails?.object || ''],
            ['UNIDADE:', projectDetails?.unit || ''],
            ['LOCAL:', projectDetails?.location || ''],
            [],
            ['ITEM', 'FONTE', 'DESCRIÇÃO', 'UNID', 'QTD', 'UNIT MAT', 'TOTAL MAT', 'UNIT MDO', 'TOTAL MDO', 'TOTAL']
        ];

        // Data Rows
        services.forEach((item, index) => {
            const totalMat = item.materialPrice * item.area;
            const totalMdo = item.laborPrice * item.area;
            const total = totalMat + totalMdo;

            wsData.push([
                `1.${index + 1}`,
                `${item.source} ${item.code}`,
                item.name,
                item.unit,
                item.area,
                item.materialPrice,
                totalMat,
                item.laborPrice,
                totalMdo,
                total
            ]);
        });

        // Footer
        wsData.push([]);
        const totalMaterial = services.reduce((acc, item) => acc + (item.materialPrice * item.area), 0);
        const totalLabor = services.reduce((acc, item) => acc + (item.laborPrice * item.area), 0);
        const totalGeneral = totalMaterial + totalLabor;

        wsData.push(['SUB TOTAL', '', '', '', '', '', totalMaterial, '', totalLabor, totalGeneral]);
        wsData.push(['TOTAL GERAL', '', '', '', '', '', '', '', '', totalGeneral]);

        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Column widths
        ws['!cols'] = [
            { wch: 8 }, { wch: 15 }, { wch: 50 }, { wch: 8 }, { wch: 10 },
            { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 12 }, { wch: 15 }
        ];

        XLSX.utils.book_append_sheet(wb, ws, "Orçamento");
        XLSX.writeFile(wb, `Orcamento_${projectDetails?.object || 'Project'}.xlsx`);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-2 transition-colors"
                    >
                        <ArrowLeft size={16} className="mr-1" />
                        Voltar ao Dashboard
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg text-green-700">
                            <FileSpreadsheet size={28} />
                        </div>
                        Orçamento Estimativo
                    </h1>
                    <p className="mt-1 text-gray-500">Data Base: FEV/22</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm font-medium text-sm transition-colors">
                        <Printer size={18} />
                        Imprimir
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow-sm font-medium text-sm transition-colors"
                    >
                        <Download size={18} />
                        Exportar Excel
                    </button>
                </div>
            </div>

            {/* Sheet matching ORÇ.pdf structure */}
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden text-xs md:text-sm">

                {/* Header Information Block */}
                <div className="border-b-2 border-black p-4 bg-white text-center font-bold">
                    <p className="text-lg">SECRETARIA DA SEGURANÇA PÚBLICA</p>
                    <p>POLÍCIA MILITAR DO ESTADO DE SÃO PAULO</p>
                    <p>DIRETORIA DE FINANÇAS - CENTRO INTEGRADO DE APOIO PATRIMONIAL</p>
                    <p className="mt-2">ORÇAMENTO ESTIMATIVO</p>
                </div>
                <div className="border-b border-black p-2 bg-gray-50 grid grid-cols-[100px_1fr] gap-2 text-xs">
                    <div className="font-bold text-right">ASSUNTO:</div>
                    <div>{projectDetails?.object || 'Serviços de manutenção predial'}</div>
                    <div className="font-bold text-right">UNIDADE:</div>
                    <div>{projectDetails?.unit || ''}</div>
                    <div className="font-bold text-right">LOCAL:</div>
                    <div>{projectDetails?.location || 'Avenida Airton Pretini, 69, Penha, São Paulo/SP'}</div>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 border-collapse">
                        <thead className="bg-gray-200 text-gray-800 font-bold border-b-2 border-black">
                            <tr>
                                <th className="px-2 py-2 border-r border-gray-400 w-12 text-center">ITEM</th>
                                <th className="px-2 py-2 border-r border-gray-400 w-24 text-center">FONTE</th>
                                <th className="px-2 py-2 border-r border-gray-400 text-left">DESCRIÇÃO DOS SERVIÇOS</th>
                                <th className="px-2 py-2 border-r border-gray-400 w-16 text-center">UNID</th>
                                <th className="px-2 py-2 border-r border-gray-400 w-20 text-center">QTD</th>
                                <th className="px-2 py-2 border-r border-gray-400 w-24 text-right">UNIT MAT</th>
                                <th className="px-2 py-2 border-r border-gray-400 w-28 text-right">TOTAL MAT</th>
                                <th className="px-2 py-2 border-r border-gray-400 w-24 text-right">UNIT MDO</th>
                                <th className="px-2 py-2 border-r border-gray-400 w-28 text-right">TOTAL MDO</th>
                                <th className="px-2 py-2 w-28 text-right">TOTAL</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {/* Section 1 */}
                            <tr className="bg-gray-100 font-bold">
                                <td className="px-2 py-1 border-r border-gray-300 text-center">1</td>
                                <td className="px-2 py-1 border-r border-gray-300" colSpan={9}>SERVIÇOS GERAIS</td>
                            </tr>

                            {services.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="px-6 py-12 text-center text-gray-500 italic">
                                        Nenhum serviço adicionado.
                                    </td>
                                </tr>
                            ) : (
                                services.map((item, index) => {
                                    const totalMatItem = item.materialPrice * item.area;
                                    const totalMdoItem = item.laborPrice * item.area;
                                    const totalItem = totalMatItem + totalMdoItem;

                                    return (
                                        <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                                            <td className="px-2 py-2 border-r border-gray-300 text-center">1.{index + 1}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-center text-xs">{item.source} {item.code}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-xs">{item.name}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-center">{item.unit}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-center">{item.area.toFixed(2)}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-right">{formatCurrency(item.materialPrice)}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-right">{formatCurrency(totalMatItem)}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-right">{formatCurrency(item.laborPrice)}</td>
                                            <td className="px-2 py-2 border-r border-gray-300 text-right">{formatCurrency(totalMdoItem)}</td>
                                            <td className="px-2 py-2 text-right font-bold">{formatCurrency(totalItem)}</td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                        {services.length > 0 && (
                            <tfoot className="bg-gray-100 font-bold border-t-2 border-black">
                                <tr>
                                    <td colSpan={6} className="px-2 py-2 text-right border-r border-gray-400">SUB TOTAL</td>
                                    <td className="px-2 py-2 text-right border-r border-gray-400">{formatCurrency(totalMaterial)}</td>
                                    <td className="px-2 py-2 border-r border-gray-400"></td>
                                    <td className="px-2 py-2 text-right border-r border-gray-400">{formatCurrency(totalLabor)}</td>
                                    <td className="px-2 py-2 text-right">{formatCurrency(totalGeneral)}</td>
                                </tr>
                                <tr className="bg-gray-200 border-t border-black text-sm">
                                    <td colSpan={9} className="px-4 py-3 text-right">TOTAL GERAL:</td>
                                    <td className="px-4 py-3 text-right">{formatCurrency(totalGeneral)}</td>
                                </tr>
                            </tfoot>
                        )}
                    </table>
                </div>
            </div>

            <div className="flex justify-between items-center text-xs text-gray-500 mt-4">
                <p>São Paulo, {formatDate()}</p>
                <p>Elaborado por MeMori Fácil</p>
            </div>
        </div>
    );
};