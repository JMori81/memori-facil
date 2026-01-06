export enum ProjectStatus {
  IN_PROGRESS = 'Em Andamento',
  COMPLETED = 'Concluído',
  DRAFT = 'Rascunho'
}

export interface Project {
  id: string;
  name: string;
  description: string;
  client: string;
  status: ProjectStatus;
  date: string;
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
  plan: string;
}

export interface ProjectDetails {
  object: string;
  location: string;
  date: string;
  unit: string;
}

export interface ServiceItem {
  id: string;
  code: string; // Ex: 18.08.062
  source: string; // Ex: CDHU, FDE
  name: string;
  unit: string; // Ex: m², un, m
  area: number; // This acts as Quantity
  environment: string;
  existingFloor: string;
  newFloor: string;
  brand: string;
  model: string;
  materialPrice: number;
  laborPrice: number;
  memorialDef?: {
    object: string;
    methodology: string[];
    materials: string[];
    measurement: string;
  };
  category: string;
}

export interface DFDData {
  sector: string; // Setor Requisitante
  justification: string; // Justificativa da Necessidade
  objectDescription: string; // Descrição do Objeto
  strategicAlignment: string; // Alinhamento Estratégico
  estimatedValue: number; // Estimativa de Valor (derived from budget)
  expectedTimeline: string; // Cronograma Desejado
}

export interface ETPData {
  needDescription: string; // 1. Descrição da Necessidade (from DFD)
  requirements: string; // 2. Requisitos da Contratação
  marketResearch: string; // 3. Levantamento de Mercado
  solutionDescription: string; // 4. Descrição da Solução
  quantityEstimate: string; // 5. Estimativa de Quantidades (summary)
  valueEstimate: string; // 6. Estimativa do Valor (summary)
  partitioningJustification: string; // 7. Justificativa para Parcelamento
  expectedResults: string; // 8. Resultados Pretendidos
  priorMeasures: string; // 9. Providências Prévias
  relatedHires: string; // 10. Contratações Correlatas
  environmentalImpacts: string; // 11. Impactos Ambientais
  viability: string; // 12. Viabilidade
}