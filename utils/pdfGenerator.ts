import jsPDF from 'jspdf';
import { DFDData, ETPData } from '../types';

const generateHeader = (doc: jsPDF, title: string) => {
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('ESTADO DE SÃO PAULO', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(title, 105, 30, { align: 'center' });
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    doc.setFont('helvetica', 'normal');
};

const addSection = (doc: jsPDF, title: string, content: string, yPos: number): number => {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(title, 20, yPos);

    yPos += 7;
    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');

    const textLines = doc.splitTextToSize(content, 170);
    doc.text(textLines, 20, yPos);

    return yPos + (textLines.length * 6) + 10;
};

export const generateDFDPDF = (data: DFDData): void => {
    const doc = new jsPDF();
    let y = 45;

    generateHeader(doc, 'DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA - DFD');

    y = addSection(doc, '1. SETOR REQUISITANTE:', data.sector, y);
    y = addSection(doc, '2. DESCRIÇÃO DO OBJETO:', data.objectDescription, y);
    y = addSection(doc, '3. JUSTIFICATIVA DA NECESSIDADE:', data.justification, y);
    y = addSection(doc, '4. ALINHAMENTO ESTRATÉGICO:', data.strategicAlignment, y);
    y = addSection(doc, '5. ESTIMATIVA DE VALOR:', `R$ ${data.estimatedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`, y);
    y = addSection(doc, '6. CRONOGRAMA DESEJADO:', data.expectedTimeline, y);

    // Date and Signatures
    y += 20;
    if (y > 250) {
        doc.addPage();
        y = 40;
    }

    const date = new Date().toLocaleDateString('pt-BR');
    doc.text(`Data: ${date}`, 20, y);

    y += 30;
    doc.line(20, y, 90, y);
    doc.line(110, y, 180, y);

    doc.setFontSize(10);
    doc.text('Responsável pela Requisição', 55, y + 5, { align: 'center' });
    doc.text('Autoridade Competente', 145, y + 5, { align: 'center' });

    doc.save('DFD-Documento_Formalizacao_Demanda.pdf');
};

export const generateETPPDF = (data: ETPData): void => {
    const doc = new jsPDF();
    let y = 45;

    generateHeader(doc, 'ESTUDO TÉCNICO PRELIMINAR - ETP');

    const checkPageBreak = (currentY: number) => {
        if (currentY > 260) {
            doc.addPage();
            return 30;
        }
        return currentY;
    };

    y = addSection(doc, '1. DESCRIÇÃO DA NECESSIDADE:', data.needDescription, y);
    y = checkPageBreak(y);

    y = addSection(doc, '2. REQUISITOS DA CONTRATAÇÃO:', data.requirements, y);
    y = checkPageBreak(y);

    y = addSection(doc, '3. LEVANTAMENTO DE MERCADO:', data.marketResearch, y);
    y = checkPageBreak(y);

    y = addSection(doc, '4. DESCRIÇÃO DA SOLUÇÃO:', data.solutionDescription, y);
    y = checkPageBreak(y);

    y = addSection(doc, '5. ESTIMATIVA DE QUANTIDADES:', data.quantityEstimate, y);
    y = checkPageBreak(y);

    y = addSection(doc, '6. ESTIMATIVA DO VALOR:', data.valueEstimate, y);
    y = checkPageBreak(y);

    y = addSection(doc, '7. JUSTIFICATIVA PARA O PARCELAMENTO:', data.partitioningJustification, y);
    y = checkPageBreak(y);

    y = addSection(doc, '8. RESULTADOS PRETENDIDOS:', data.expectedResults, y);
    y = checkPageBreak(y);

    y = addSection(doc, '9. PROVIDÊNCIAS PRÉVIAS:', data.priorMeasures, y);
    y = checkPageBreak(y);

    y = addSection(doc, '10. CONTRATAÇÕES CORRELATAS:', data.relatedHires, y);
    y = checkPageBreak(y);

    y = addSection(doc, '11. IMPACTOS AMBIENTAIS:', data.environmentalImpacts, y);
    y = checkPageBreak(y);

    y = addSection(doc, '12. VIABILIDADE:', data.viability, y);
    y = checkPageBreak(y);

    // Date and Signatures
    y += 20;
    if (y > 250) {
        doc.addPage();
        y = 40;
    }

    const date = new Date().toLocaleDateString('pt-BR');
    doc.text(`Data: ${date}`, 20, y);

    y += 30;
    doc.line(60, y, 150, y);

    doc.setFontSize(10);
    doc.text('Responsável pela Elaboração do ETP', 105, y + 5, { align: 'center' });

    doc.save('ETP-Estudo_Tecnico_Preliminar.pdf');
};
