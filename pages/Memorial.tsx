import React from 'react';
import { ServiceItem, ProjectDetails } from '../types';
import { FileText, CheckCircle, Printer, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MemorialProps {
  services: ServiceItem[];
  projectDetails: ProjectDetails | null;
  onComplete: () => void;
}

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const Memorial: React.FC<MemorialProps> = ({ services, projectDetails, onComplete }) => {
  const navigate = useNavigate();

  const handleDownload = async () => {
    const element = document.getElementById('memorial-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Higher quality
        logging: false,
        useCORS: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`Memorial_${projectDetails?.object || 'Servicos'}.pdf`);

      onComplete();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Erro ao gerar PDF. Tente novamente.');
    }
  };

  // Helper to render specific content based on service type
  const renderServiceContent = (service: ServiceItem, index: number) => {
    // Check for structured Memorial Definition (New System)
    if (service.memorialDef) {
      return (
        <div key={service.id} className="mb-8 break-inside-avoid">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{index + 1}. {service.name}</h3>

          <div className="space-y-4 text-justify text-gray-700 leading-relaxed font-serif">
            <div>
              <h4 className="font-bold text-sm uppercase mb-1">A. Objeto Específico:</h4>
              <p>{service.memorialDef.object}</p>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase mb-1">B. Execução / Metodologia:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {service.memorialDef.methodology.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase mb-1">C. Materiais:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {service.memorialDef.materials.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
                {(service.brand || service.model) && (
                  <li><strong>Referência:</strong> {service.brand} {service.model}</li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase mb-1">D. Critérios de Medição:</h4>
              <p>{service.memorialDef.measurement}</p>
            </div>
          </div>
        </div>
      );
    }

    if (service.name.toLowerCase().includes('piso') || service.name.toLowerCase().includes('revestimento')) {
      return (
        <div key={service.id} className="mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{index + 1}. {service.name}</h3>

          <div className="space-y-4 text-justify text-gray-700 leading-relaxed">
            <div>
              <h4 className="font-bold text-sm uppercase mb-1">A. Objeto Específico:</h4>
              <p>
                Este item contempla a remoção integral do revestimento existente e do contrapiso, caso necessário para adequação de níveis, em áreas previamente definidas (Ambiente: {service.environment}). Inclui o preparo da nova base com execução de contrapiso regularizado e desempenado, a aplicação de impermeabilização (se aplicável), o assentamento de novo revestimento ({service.brand} {service.model}) e o rejuntamento.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase mb-1">B. Execução / Metodologia:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Serviços Preliminares:</strong> Proteção de áreas adjacentes, remoção cuidadosa de rodapés e soleiras existentes. Limpeza completa da área.</li>
                <li><strong>Demolição:</strong> Remoção manual ou mecanizada do revestimento cerâmico existente. Seleção e acondicionamento de resíduos (Classe A) conforme Resolução CONAMA 307/2002.</li>
                <li><strong>Preparação da Base:</strong> Verificação do subleito. Execução de novo contrapiso regularizado com argamassa cimento e areia. Aplicação de impermeabilização se área molhada.</li>
                <li><strong>Assentamento:</strong> Aplicação de argamassa colante industrializada (AC-II ou AC-III conforme necessidade) com desempenadeira dentada (dupla colagem para peças grandes). Uso de espaçadores plásticos para juntas uniformes.</li>
                <li><strong>Rejuntamento:</strong> Após cura (72h), aplicação de rejunte flexível na cor especificada, com acabamento liso e uniforme. Limpeza final.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase mb-1">C. Materiais:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Placa Cerâmica/Porcelanato:</strong> {service.newFloor === 'porcelanato' ? 'Porcelanato Técnico/Esmaltado' : 'Cerâmica Esmaltada'}, marca de referência {service.brand}, modelo {service.model}. Resistência PEI adequada ao tráfego.</li>
                <li><strong>Argamassa Colante:</strong> Tipo industrializada AC-II ou AC-III, conforme NBR 14081.</li>
                <li><strong>Rejunte:</strong> Cimentício aditivado, cor a definir pela fiscalização.</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase mb-1">D. Critérios de Medição:</h4>
              <p>
                A medição será realizada pela área real de piso instalado (m²), descontando-se interferências. A unidade de medida é metro quadrado (m²).
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Fallback for generic services
    return (
      <div key={service.id} className="mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{index + 1}. {service.name}</h3>
        <div className="text-justify text-gray-700 leading-relaxed text-sm">
          {service.existingFloor && service.existingFloor.length > 20 ? (
            <p>{service.existingFloor}</p>
          ) : (
            <p>Execução completa de {service.name.toLowerCase()}, incluindo todos os materiais e mão de obra necessários, conforme normas técnicas vigentes e especificação do código {service.source} {service.code}.</p>
          )}
          <p className="mt-2 font-medium text-gray-600">
            Local: {service.environment} | Quantidade: {service.area} {service.unit}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Actions */}
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
            <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
              <FileText size={28} />
            </div>
            Memorial Descritivo
          </h1>
          <p className="mt-1 text-gray-500">Visualização do documento técnico para aprovação.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm font-medium text-sm transition-colors">
            <Printer size={18} />
            Imprimir
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md font-bold text-sm transition-colors animate-pulse"
          >
            <CheckCircle size={18} />
            Aprovar e Baixar PDF
          </button>
        </div>
      </div>

      {/* Document Preview */}
      <div id="memorial-content" className="bg-white shadow-lg border border-gray-200 rounded-none p-12 min-h-[1000px] text-gray-800 font-serif">

        {/* Document Header */}
        <div className="border-b-2 border-gray-800 pb-6 mb-8 text-center">
          <h2 className="text-xl font-bold uppercase tracking-wider mb-2">SECRETARIA DA SEGURANÇA PÚBLICA</h2>
          <h3 className="text-lg font-bold uppercase mb-1">POLÍCIA MILITAR DO ESTADO DE SÃO PAULO</h3>
          <p className="text-sm font-bold uppercase text-gray-600">CENTRO INTEGRADO DE APOIO PATRIMONIAL - DIVISÃO TÉCNICA</p>
        </div>

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-center uppercase underline mb-6">MEMORIAL DESCRITIVO DETALHADO</h1>

          <div className="grid grid-cols-1 gap-2 text-sm mb-6">
            <p><strong>OBJETO:</strong> {projectDetails?.object?.toUpperCase() || 'OBJETO NÃO DEFINIDO'}</p>
            <p><strong>LOCAL:</strong> {projectDetails?.location?.toUpperCase() || 'LOCAL NÃO DEFINIDO'}</p>
            <p><strong>DATA:</strong> {projectDetails?.date ? new Date(projectDetails.date).toLocaleDateString('pt-BR') : new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase mb-2">1. INTRODUÇÃO E OBJETIVO</h3>
            <p className="text-justify leading-relaxed">
              O presente Memorial Descritivo tem como objetivo detalhar, de forma clara e objetiva, os serviços de manutenção e reforma a serem executados no edifício público acima identificado. Este documento é parte integrante do Projeto Básico e servirá de alicerce para o orçamento, a fiscalização e o recebimento dos serviços, minimizando ambiguidades e garantindo a qualidade técnica da execução conforme as normas ABNT vigentes.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase mb-2">2. DESCRIÇÃO DOS SERVIÇOS</h3>
            {services.length === 0 ? (
              <p className="italic text-gray-500">Nenhum serviço selecionado.</p>
            ) : (
              services.map((service, idx) => renderServiceContent(service, idx))
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold uppercase mb-2">3. CONSIDERAÇÕES FINAIS</h3>
            <p className="text-justify leading-relaxed">
              A Contratada deverá seguir fielmente as especificações deste memorial. Materiais deverão ser novos e de primeira qualidade. A limpeza final da obra é obrigatória para o recebimento definitivo.
            </p>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="mt-24 pt-8 border-t border-gray-300 flex justify-between items-end">
          <div className="text-center">
            <div className="w-64 border-t border-black mb-2"></div>
            <p className="font-bold">Responsável Técnico</p>
            <p className="text-sm">CREA/CAU: ______________</p>
          </div>
          <div className="text-sm text-gray-500">
            Página 1 de 1
          </div>
        </div>

      </div>
    </div>
  );
};