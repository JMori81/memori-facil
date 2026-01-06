import { ProjectDetails, ServiceItem, DFDData, ETPData } from '../types';

export const generateDFDDefaults = (project: ProjectDetails, services: ServiceItem[]): DFDData => {
    const totalValue = services.reduce((acc, curr) => acc + (curr.area * (curr.materialPrice + curr.laborPrice)), 0);

    return {
        sector: 'Departamento de Infraestrutura e Obras',
        justification: `A presente demanda se justifica pela necessidade de manutenção e adequação das instalações do prédio público localizado em ${project.location}, visando garantir a segurança, acessibilidade e funcionalidade para os usuários, conforme vistoria técnica realizada.`,
        objectDescription: project.object,
        strategicAlignment: 'A contratação está alinhada ao Planejamento Estratégico do Órgão, especificamente na meta de conservação do patrimônio público e melhoria da infraestrutura de atendimento ao cidadão.',
        estimatedValue: totalValue,
        expectedTimeline: 'Início imediato após a homologação do processo licitatório, com prazo de execução conforme cronograma físico-financeiro.'
    };
};

export const generateETPDefaults = (project: ProjectDetails, services: ServiceItem[], dfd: DFDData): ETPData => {
    // 1. Enrich Requirements based on categories and methodologies
    const methodologies = new Set<string>();
    const standards = new Set<string>();

    services.forEach(s => {
        if (s.memorialDef) {
            s.memorialDef.methodology.forEach(m => methodologies.add(m));
        }
        // Basic inference for standards
        if (s.category === 'Elétrica') standards.add('NBR 5410 (Instalações Elétricas de Baixa Tensão)');
        if (s.category === 'Hidráulica') standards.add('NBR 5626 (Instalações Prediais de Água Fria)');
        if (s.category === 'Pintura') standards.add('NBR 13245 (Pintura para Construção Civil)');
        if (s.category.includes('Pisos')) standards.add('NBR 13753 (Revestimento de Piso Interno ou Externo com Placas Cerâmicas)');
    });

    const standardsText = Array.from(standards).length > 0
        ? `\n\nNormas Técnicas Obrigatórias:\n${Array.from(standards).map(s => `- ${s}`).join('\n')}`
        : '';

    // 2. Build detailed Solution Description
    const solutionDetails = services.map(s => {
        if (s.memorialDef) {
            return `-> ${s.name}: ${s.memorialDef.object}`;
        }
        return `-> ${s.name}: Execução conforme especificações técnicas padrão.`;
    }).join('\n');

    // 3. Environmental Logic
    const hasDemolition = services.some(s => s.category === 'Demolições');
    const environmentalText = hasDemolition
        ? 'A execução envolve demolições que geram resíduos Classe A. A CONTRATADA deverá elaborar Plano de Gerenciamento de Resíduos da Construção Civil (PGRCC) e garantir a destinação em aterros licenciados, conforme Resolução CONAMA 307/2002. É vedada a queima de materiais ou disposição em áreas não licenciadas.'
        : 'Os serviços geram resíduos de baixa complexidade (embalagens, restos de materiais). A contratada deverá proceder com a limpeza diária e o descarte em caçambas estacionárias apropriadas.';

    // 4. Measurement & Quantities Logic
    const measurementCriteria = services
        .filter(s => s.memorialDef?.measurement)
        .map(s => {
            const qty = s.area.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            return `- ${s.name}: ${qty} ${s.unit} (Critério: ${s.memorialDef!.measurement})`;
        })
        .join('\n');

    const measurementText = measurementCriteria
        ? `\n\nDetalhamento dos Quantitativos e Critérios de Medição:\n${measurementCriteria}`
        : '';

    return {
        needDescription: dfd.justification,
        requirements: `A execução deverá seguir rigorosamente as melhores práticas de engenharia.${standardsText}\n\nRequisitos Específicos de Execução:\n- O uso de EPIs é obrigatório durante toda a obra.\n- Os materiais devem ser novos e de primeira linha.\n- A garantia dos serviços será de 5 (cinco) anos conforme Código Civil.\n- A contratada deverá manter preposto capacitado no local.`,
        marketResearch: 'A estimativa de preços baseou-se em pesquisa de mercado utilizando tabelas oficiais de referência (CDHU - Companhia de Desenvolvimento Habitacional e Urbano) atualizadas, que refletem os preços praticados no mercado para contratações públicas similares, acrescido de BDI compatível.',
        solutionDescription: `A solução técnica definida abrange a execução dos seguintes serviços especializados:\n\n${solutionDetails}\n\nEsta solução foi dimensionada para atender a demanda com durabilidade, facilidade de manutenção futura e melhor relação custo-benefício.`,
        quantityEstimate: `As quantidades foram levantadas através de inspeção técnica in loco e cálculo geométrico das áreas de intervenção, considerando as dimensões reais do imóvel e eventuais perdas inerentes ao processo construtivo.${measurementText}`,
        valueEstimate: `O valor total estimado para a contratação é de R$ ${dfd.estimatedValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}, sendo compatível com o praticado no mercado para obras deste porte e complexidade.`,
        partitioningJustification: 'O parcelamento do objeto não é técnica nem economicamente viável. A interdependência das etapas (exime coordenação única para demolição, preparo e acabamento) recomenda a contratação global para assegurar a responsabilidade técnica única, o cumprimento do cronograma e a garantia integrada da obra (Súmula 247 do TCU).',
        expectedResults: 'Entrega da edificação em perfeitas condições de uso, com instalações seguras e adequadas ao funcionamento público; Valorização do patrimônio imobiliário; Redução de custos de manutenção corretiva no curto prazo.',
        priorMeasures: 'Foram realizadas vistorias técnicas para levantamento das patologias e definição do escopo. O local encontra-se liberado para início das intervenções.',
        relatedHires: 'Não há contratações correlatas diretas. A fiscalização será exercida por equipe própria do órgão contratante.',
        environmentalImpacts: environmentalText,
        viability: 'O estudo demonstra viabilidade técnica (soluções consagradas), econômica (compatível com orçamento) e operacional (prazo exequível). A intervenção é necessária e o retorno social justifica o investimento.'
    };
};
