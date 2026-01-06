import { ServiceItem } from '../types';

export interface MemorialDefinition {
    object: string;
    methodology: string[];
    materials: string[];
    measurement: string;
}

export interface CDHUItem {
    code: string;
    description: string;
    unit: string;
    price: number;
    category: string;
    detailedSpec: string;
    memorialDef?: MemorialDefinition;
}

export const cdhuCatalog: CDHUItem[] = [
    // 1. Serviços Preliminares
    {
        code: '02.08.050',
        description: 'Placa de obra em lona com impressão digital',
        unit: 'm²',
        price: 150.00,
        category: 'Serviços Preliminares',
        detailedSpec: 'Fornecimento e instalação de placa de identificação da obra em lona vinílica com impressão digital de alta resolução, fixada em estrutura de madeira ou metálica.',
        memorialDef: {
            object: 'Fornecimento, confecção e instalação de placa de identificação da obra, conforme modelo oficial exigido.',
            methodology: [
                'A placa será confeccionada em lona vinílica de alta resistência, com impressão digital de alta resolução (1440 DPI).',
                'A estrutura de sustentação será executada em madeira de lei serrada (pontaletes 6x6cm e sarrafos 5x2cm) ou estrutura metálica, garantindo perfeita estabilidade e planicidade.',
                'A fixação da lona sobre a estrutura será feita com abraçadeiras plásticas ou grampos galvanizados, garantindo o tencionamento adequado.',
                'A placa deverá ser instalada em local visível, preferencialmente na testada principal do imóvel, sem obstruir a circulação ou a visibilidade do trânsito.'
            ],
            materials: [
                'Lona vinílica 440g com trama de nylon.',
                'Estrutura em madeira de lei (Peroba/Garapeira) ou aço galvanizado.',
                'Tintas solventes resistentes a intempéries.'
            ],
            measurement: 'A medição será realizada pela área total da placa instalada (m²).'
        }
    },
    {
        code: '02.05.010',
        description: 'Tapume móvel de madeira',
        unit: 'm²',
        price: 85.00,
        category: 'Serviços Preliminares',
        detailedSpec: 'Execução de tapume móvel com chapas de madeira compensada resinada sobre estrutura de madeira.',
        memorialDef: {
            object: 'Execução de fechamento provisório do canteiro de obras para garantia da segurança e isolamento da área de intervenção.',
            methodology: [
                'Implantar pontaletes de madeira de 3" x 3" (7,5 x 7,5 cm) espaçados a cada 2,00m, devidamente contraventados.',
                'Fixar chapas de madeira compensada resinada de 6mm ou 10mm sobre a estrutura.',
                'Prever portões de acesso para veículos e pedestres conforme logística da obra.',
                'Pintura em cal ou tinta látex na cor branca (se solicitado).'
            ],
            materials: [
                'Chapa de madeira compensada resinada 1.10 x 2.20m.',
                'Madeira serrada mista para estrutura.',
                'Pregos galvanizados e dobradiças reforçadas.'
            ],
            measurement: 'Será medido pela projeção vertical (comprimento x altura) do tapume executado (m²).'
        }
    },

    // 2. Demolições
    {
        code: '03.01.020',
        description: 'Demolição manual de concreto simples',
        unit: 'm³',
        price: 250.00,
        category: 'Demolições',
        detailedSpec: 'Demolição manual de concreto simples (sem armadura), abrangendo lastros e bases.',
        memorialDef: {
            object: 'Demolição de elementos em concreto simples, tais como contrapisos, calçadas e bases de equipamentos.',
            methodology: [
                'A demolição será executada manualmente, utilizando-se ponteiros, marretas e talhadeiras.',
                'Deverão ser tomadas precauções para não abalar as estruturas remanescentes ou tubulações embutidas.',
                'O entulho gerado será imediatamente segregado e transportado para caçambas estacionárias.',
                'O local deverá ser constantemente umidificado para evitar a dispersão de poeira.'
            ],
            materials: [
                'Equipamentos manuais: marretas, ponteiros, pás e carrinhos de mão.'
            ],
            measurement: 'Volume geométrico do concreto demolido medido no local (m³).'
        }
    },
    {
        code: '03.02.040',
        description: 'Demolição manual de alvenaria de elevação',
        unit: 'm³',
        price: 120.00,
        category: 'Demolições',
        detailedSpec: 'Demolição manual cuidadosa de alvenaria de elevação.',
        memorialDef: {
            object: 'Desmonte e remoção de paredes de alvenaria de tijolos ou blocos.',
            methodology: [
                'A demolição iniciar-se-á da parte superior para a inferior.',
                'Remover previamente marcos, batentes e instalações elétricas/hidráulicas interferentes.',
                'Evitar a queda de blocos grandes sobre lajes que não foram escoradas para tal carga.',
                'Umidificação constante para controle de particulados.'
            ],
            materials: [
                'Ferramentas manuais e EPIs adequados.'
            ],
            measurement: 'Volume real da alvenaria demolida, descontando-se vãos superiores a 2,00 m² (m³).'
        }
    },
    {
        code: '03.04.020',
        description: 'Demolição de revestimento cerâmico (piso/parede)',
        unit: 'm²',
        price: 35.00,
        category: 'Demolições',
        detailedSpec: 'Retirada de revestimento cerâmico, azulejos ou ladrilhos, inclusive argamassa.',
        memorialDef: {
            object: 'Remoção de revestimentos cerâmicos em pisos ou paredes, incluindo a camada de argamassa de assentamento.',
            methodology: [
                'Executar o apicoamento e remoção das placas com talhadeira e marreta ou martelete leve.',
                'Remover toda a argamassa de assentamento remanescente até atingir a base (alvenaria ou contrapiso) firme.',
                'Limpeza e varrição contínua do local.',
                'Preservação das instalações embutidas.'
            ],
            materials: [
                'Ferramentas de impacto manual ou elétrico leve.'
            ],
            measurement: 'Área superficial do revestimento removido (m²).'
        }
    },
    {
        code: '03.10.140',
        description: 'Remoção de pintura em massa com lixamento',
        unit: 'm²',
        price: 18.00,
        category: 'Demolições',
        detailedSpec: 'Remoção de camadas de pintura antiga ou massa até exposição do substrato.',
        memorialDef: {
            object: 'Remoção total ou parcial de pintura existente para preparo de superfície.',
            methodology: [
                'Utilizar espátulas de aço e lixadeiras manuais ou mecânicas.',
                'Remover partes soltas, descascadas ou com aderência comprometida.',
                'Após a remoção, a superfície deverá ser lavada e isenta de pó para receber novo acabamento.'
            ],
            materials: [
                'Lixas grão 60/80/100, espátulas e removedores (se necessário).'
            ],
            measurement: 'Área superficial tratada (m²).'
        }
    },
    {
        code: '04.04.020',
        description: 'Retirada de piso de pedra/granito',
        unit: 'm²',
        price: 45.00,
        category: 'Demolições',
        detailedSpec: 'Retirada de pisos de pedra natural, mármore ou granito.',
        memorialDef: {
            object: 'Remoção de piso em pedra natural assentado sobre argamassa.',
            methodology: [
                'Se houver interesse no reaproveitamento, iniciar a retirada com cuidado pelas juntas, utilizando alavancas.',
                'Caso contrário, fragmentar e remover as peças juntamente com a argamassa de base.',
                'Regularizar a superfície remanescente.'
            ],
            materials: [
                'Alavancas, talhadeiras e ponteiros.'
            ],
            measurement: 'Área superficial removida (m²).'
        }
    },

    // 3. Troca de Piso e Revestimento
    {
        code: '18.06.142',
        description: 'Piso cerâmico esmaltado PEI-5',
        unit: 'm²',
        price: 85.00,
        category: 'Pisos e Revestimentos',
        detailedSpec: 'Fornecimento e assentamento de piso cerâmico esmaltado PEI-5.',
        memorialDef: {
            object: 'Fornecimento e instalação de piso cerâmico em áreas internas/externas.',
            methodology: [
                'Limpar e umedecer a base.',
                'Estender a argamassa colante com desempenadeira dentada (8mm). Para peças > 30x30cm, usar dupla colagem (argamassa na base e na peça).',
                'Assentar as placas garantindo o alinhamento das juntas e nivelamento (usar espaçadores).',
                'Realizar os recortes nos cantos e interferências.',
                'Aguardar 72h para o rejuntamento.'
            ],
            materials: [
                'Placa cerâmica PEI-5, absorção BIIa ou BIIb, conforme NBR 13818.',
                'Argamassa colante industrializada AC-II ou AC-III.',
                'Espaçadores plásticos.'
            ],
            measurement: 'Área real executada, sem desconto de perdas (m²).'
        }
    },
    {
        code: '18.06.410',
        description: 'Rejuntamento de placas cerâmicas',
        unit: 'm²',
        price: 12.00,
        category: 'Pisos e Revestimentos',
        detailedSpec: 'Execução de rejuntamento para placas cerâmicas com argamassa industrializada (rejunte flexível) na cor definida pela fiscalização, incluindo limpeza final das juntas e remoção de excessos.',
        memorialDef: {
            object: 'Preenchimento técnico das juntas entre placas cerâmicas.',
            methodology: [
                'Limpeza profunda das juntas (frestas) para remoção de poeira e restos de argamassa.',
                'Preparo da pasta de rejuntamento (mecânico ou manual) conforme fabricante.',
                'Aplicação em diagonais com desempenadeira de borracha, pressionando para evitar vazios.',
                'Remoção do excesso e frisamento (acabamento) com esponja úmida após tempo de pega inicial.',
                'Limpeza final do pano.'
            ],
            materials: [
                'Argamassa de rejuntamento flexível (tipo II) na cor definida em projeto.',
                'Esponjas e estopas.'
            ],
            measurement: 'Área efetiva de revestimento tratado (m²).'
        }
    },
    {
        code: '17.02.020',
        description: 'Contrapiso em argamassa 1:3',
        unit: 'm²',
        price: 48.00,
        category: 'Pisos e Revestimentos',
        detailedSpec: 'Execução de contrapiso ou argamassa de regularização com traço 1:3 (cimento e areia), espessura média de 3,0 cm, acabamento sarrafeado e desempenado, preparado para receber revestimento.',
        memorialDef: {
            object: 'Execução de base regularizada de cimento e areia para recebimento de piso.',
            methodology: [
                'Limpeza e lavagem da base de concreto.',
                'Execução de taliscas de nível para garantir caimento (se necessário) e espessura uniforme.',
                'Aplicação de nata de cimento para aderência (se necessário).',
                'Lançamento da argamassa farofa e compactação.',
                'Sarrafeamento com régua de alumínio e acabamento desempenado.'
            ],
            materials: [
                'Cimento Portland.',
                'Areia média lavada.',
                'Aditivo impermeabilizante (para áreas molhadas).'
            ],
            measurement: 'Área geométrica executada (m²).'
        }
    },
    {
        code: '18.15.010',
        description: 'Rodapé cerâmico',
        unit: 'm',
        price: 25.00,
        category: 'Pisos e Revestimentos',
        detailedSpec: 'Fornecimento e instalação de rodapé cerâmico, utilizando o mesmo material do piso ou peça específica, assentado com argamassa colante e rejuntado.',
        memorialDef: {
            object: 'Acabamento de proteção e arremate entre piso e parede.',
            methodology: [
                'Marcação de nível e alinhamento.',
                'Corte das peças cerâmicas na altura especificada (se não comprar pronto).',
                'Assentamento com argamassa colante no tardoz da peça.',
                'Rejuntamento da junção com o piso e com a parede (calafetação).'
            ],
            materials: [
                'Peças de rodapé cerâmico.',
                'Argamassa colante.',
                'Rejunte.'
            ],
            measurement: 'Comprimento linear instalado (m).'
        }
    },

    // 4. Pintura
    {
        code: '33.10.030',
        description: 'Pintura látex acrílico antimofo (2 demãos)',
        unit: 'm²',
        price: 38.00,
        category: 'Pintura',
        detailedSpec: 'Aplicação de tinta látex acrílica com aditivo antimofo em paredes.',
        memorialDef: {
            object: 'Pintura imobiliária em paredes internas ou externas sobre reboco ou massa.',
            methodology: [
                'Lixar a superfície para conferir aderência e remover imperfeições.',
                'Aplicar Fundo Preparador de Paredes se o reboco for fraco, ou Selador Acrílico se for novo.',
                'Aplicar a primeira demão de tinta látex acrílica com rolo de lã de pelo baixo.',
                'Aguardar intervalo de secagem de 4 horas.',
                'Aplicar a segunda demão em sentido cruzado (ou quantas necessárias para o perfeito recobrimento).'
            ],
            materials: [
                'Tinta Látex Acrílica Premium antimofo (Suvinil, Coral ou similar).',
                'Lixas e solventes de limpeza.'
            ],
            measurement: 'Área superficial efetivamente pintada, descontando vãos (m²).'
        }
    },
    {
        code: '33.11.050',
        description: 'Esmalte sintético base água em metais',
        unit: 'm²',
        price: 45.00,
        category: 'Pintura',
        detailedSpec: 'Pintura de superfícies metálicas com esmalte sintético ecológico.',
        memorialDef: {
            object: 'Proteção e acabamento de superfícies metálicas (esquadrias, grades).',
            methodology: [
                'Remoção de ferrugem com escova de aço ou lixa.',
                'Limpeza com aguarrás para remoção de oleosidade.',
                'Aplicação de Fundo Anticorrosivo (Zarcão) se houver exposição do metal ferroso.',
                'Aplicação de 2 demãos de Esmalte Sintético Base Água (secagem rápida e baixo odor).'
            ],
            materials: [
                'Esmalte Sintético Base Água (Brilhante, Acetinado ou Fosco).',
                'Fundo Zarcão ou Galvite.'
            ],
            measurement: 'Área da superfície pintada ou calculada por perímetro (m²).'
        }
    },
    {
        code: '33.02.010',
        description: 'Aplicação de fundo selador',
        unit: 'm²',
        price: 12.00,
        category: 'Pintura',
        detailedSpec: 'Aplicação de uma demão de líquido selador acrílico.',
        memorialDef: {
            object: 'Preparação de paredes novas para uniformizar a absorção.',
            methodology: [
                'Aguardar a cura completa do reboco (mínimo 28 dias).',
                'Aplicar uma demão farta e uniforme de selador acrílico diluído conforme fabricante.',
                'Aguardar secagem antes da massa ou tinta.'
            ],
            materials: [
                'Selador Acrílico pigmentado ou incolor.'
            ],
            measurement: 'Área superficial aplicada (m²).'
        }
    },

    // 5. Forro
    {
        code: '26.04.030',
        description: 'Forro de PVC inclusive estrutura',
        unit: 'm²',
        price: 75.00,
        category: 'Forro',
        detailedSpec: 'Fornecimento e instalação de forro de PVC.',
        memorialDef: {
            object: 'Execução de forro em lâminas de PVC para acabamento de teto.',
            methodology: [
                'Nivelamento do perímetro e fixação de cantoneiras (rodateto).',
                'Instalação da estrutura de sustentação (metalon) fixada na laje/telhado com tirantes rígidos, espaçados a cada 1,00m.',
                'Encaixe das lâminas de PVC perpendicularmente à estrutura, fixando-as com parafusos ponta-broca.',
                'Ajuste dos arremates finais.'
            ],
            materials: [
                'Lâminas de PVC 8mm, cor branca ou madeirada com proteção UV.',
                'Perfil metálico galvanizado (Metalon).',
                'Acessórios de fixação.'
            ],
            measurement: 'Área plana de forro executado (m²).'
        }
    },
    {
        code: '26.02.050',
        description: 'Forro de gesso acartonado (drywall)',
        unit: 'm²',
        price: 95.00,
        category: 'Forro',
        detailedSpec: 'Execução de forro em chapas de gesso acartonado (Drywall) ST (Standard), espessura 12,5mm, estruturado com perfis metálicos galvanizados, incluindo tratamento de juntas com fita e massa, pronto para pintura.',
        memorialDef: {
            object: 'Rebaixamento de teto com sistema de gesso acartonado estruturado.',
            methodology: [
                'Marcação do nível (laser/mangueira) nas paredes.',
                'Fixação das tabicas perimetrais.',
                'Fixação dos tirantes rígidos na laje superior.',
                'Montagem da grelha de perfis (F530) clipados aos reguladores.',
                'Parafusamento das chapas ST 12.5mm com parafusos trombeta.',
                'Tratamento de juntas com fita de papel e massa específica (3 demãos).'
            ],
            materials: [
                'Chapas gesso ST 12.5mm.',
                'Perfis F530, Tabicas, Tirantes.',
                'Massa de junta e fita de papel microperfurada.'
            ],
            measurement: 'Área plana de forro acabado (m²).'
        }
    },

    // 6. Instalação Elétrica (Manutenção Básica)
    {
        code: '39.02.010',
        description: 'Ponto de luz no teto',
        unit: 'un',
        price: 150.00,
        category: 'Elétrica',
        detailedSpec: 'Execução de ponto de iluminação no teto, compreendendo o fornecimento e instalação de eletroduto flexível corrugado, caixa octogonal metálica ou PVC, fiação (fase, neutro e retorno) e bocal simples, interligado ao interruptor.',
        memorialDef: {
            object: 'Instalação de infraestrutura e cabeamento para ponto de iluminação.',
            methodology: [
                'Fixação da caixa octogonal na laje ou estrutura.',
                'Instalação dos eletrodutos corrugados e luvas de emenda.',
                'Passagem dos condutores (Fase, Neutro, Retorno) utilizando guia de nylon.',
                'Identificação dos circuitos por anilhas ou fitas coloridas.',
                'Receptáculo (bocal) e teste de funcionamento.'
            ],
            materials: [
                'Eletroduto flexível corrugado reforçado (laranja) ou amarelo.',
                'Cabo flexível 1.5mm² ou 2.5mm² (anti-chama).',
                'Caixa octogonal 4x4".'
            ],
            measurement: 'Unidade (un) instalada e testada.'
        }
    },
    {
        code: '39.04.030',
        description: 'Tomada 2P+T 10A completa',
        unit: 'un',
        price: 45.00,
        category: 'Elétrica',
        detailedSpec: 'Fornecimento e instalação de conjunto de tomada de energia 2P+T, 10A, padrão brasileiro NBR 14136, incluindo suporte, placa de acabamento e módulo, e conexão aos condutores existentes.',
        memorialDef: {
            object: 'Instalação de ponto de força (tomada) em parede.',
            methodology: [
                'Chumbamento da caixa 4x2" de embutir na alvenaria nivelada.',
                'Conexão dos condutores (Fase, Neutro, Terra) aos bornes do módulo.',
                'Fixação do suporte e encaixe da placa de acabamento (espelho).',
                'Verificação da polaridade e tensão com multímetro.'
            ],
            materials: [
                'Conjunto tomada 2P+T 10A (NBR 14136).',
                'Caixa 4x2" PVC.'
            ],
            measurement: 'Unidade (un) completa instalada.'
        }
    },
    {
        code: '39.15.010',
        description: 'Disjuntor termomagnético monopolar',
        unit: 'un',
        price: 35.00,
        category: 'Elétrica',
        detailedSpec: 'Fornecimento e instalação de disjuntor termomagnético monopolar padrão DIN (minidisjuntor) em quadro de distribuição, com capacidade de corrente adequada ao circuito a proteger (10A a 32A), incluindo conexões.',
        memorialDef: {
            object: 'Instalação de dispositivo de proteção contra sobrecarga e curto-circuito.',
            methodology: [
                'Fixação do disjuntor no trilho DIN do Quadro de Distribuição.',
                'Decapagem e conexão dos cabos nos bornes garantindo o aperto adequado.',
                'Identificação do circuito com etiqueta adesiva no quadro.',
                'Reaperto das conexões.'
            ],
            materials: [
                'Disjuntor termomagnético curva C (DIN).',
                'Terminais tipo ilhós ou genéricos adequados.'
            ],
            measurement: 'Unidade (un) instalada.'
        }
    },

    // 7. Instalação Hidráulica (Manutenção Básica)
    {
        code: '45.06.020',
        description: 'Ponto de água fria (tubo PVC soldável)',
        unit: 'un',
        price: 220.00,
        category: 'Hidráulica',
        detailedSpec: 'Execução de ponto de consumo de água fria, compreendendo rasgos em alvenaria, fornecimento e instalação de tubulação de PVC soldável marrom, conexões (joelhos, tês, luvas) e joelho de transição com bucha de latão na saída.',
        memorialDef: {
            object: 'Ramal de alimentação de água fria embutido em alvenaria.',
            methodology: [
                'Abertura de rasgo ("shaft") na alvenaria.',
                'Corte, lixamento e limpeza das pontas dos tubos e conexões.',
                'Aplicação de adesivo plástico (solda fria) uniformemente.',
                'Montagem das conexões e tubos.',
                'Instalação do joelho azul (bucha latão) na saída do ponto.',
                'Teste de pressão hidrostática antes do fechamento do rasgo.'
            ],
            materials: [
                'Tubos e conexões PVC Soldável (Marrom).',
                'Joelho Azul com bucha de Latão.',
                'Adesivo plástico para PVC.'
            ],
            measurement: 'Unidade (un) por ponto de consumo.'
        }
    },
    {
        code: '46.04.010',
        description: 'Registro de gaveta 3/4"',
        unit: 'un',
        price: 85.00,
        category: 'Hidráulica',
        detailedSpec: 'Fornecimento e instalação de registro de gaveta bruto (base) de 3/4" (25mm), padrão ABNT, acoplado à tubulação, destinado ao bloqueio geral ou parcial do fluxo de água de setores ou ambientes.',
        memorialDef: {
            object: 'Dispositivo de bloqueio (seccionamento) da rede hidráulica.',
            methodology: [
                'Verificação do sentido de fluxo indicado no corpo do registro.',
                'Aplicação de fita veda-rosca (se roscável) ou solda (se soldável com adaptadores).',
                'Instalação na altura especificada (geralmente 1.80m).',
                'Proteção da haste/castelo durante o reboco.',
                'Instalação da canopla e volante cromado no acabamento final.'
            ],
            materials: [
                'Registro de Gaveta 3/4" bruto.',
                'Acabamento (Canopla + Volante) cromado ou C-50.'
            ],
            measurement: 'Unidade (un) instalada.'
        }
    },
    {
        code: '48.02.030',
        description: 'Sifão plástico extensível',
        unit: 'un',
        price: 25.00,
        category: 'Hidráulica',
        detailedSpec: 'Fornecimento e instalação de sifão tipo garrafa ou extensível universal em polipropileno (branco ou cromado), para lavatórios ou pias, incluindo vedações e conexão à válvula de escoamento e ao tubo de esgoto.',
        memorialDef: {
            object: 'Interligação entre válvula de escoamento e tubo de esgoto (fecho hídrico).',
            methodology: [
                'Ajuste do comprimento do tubo extensível ou altura do copo.',
                'Posicionamento dos anéis de vedação na válvula.',
                'Rosqueamento manual firme (sem uso de grifo para não danificar).',
                'Encaixe da saída no tubo de esgoto utilizando bolsa de borracha ou anel.',
                'Verificação de curvatura para garantir o fecho hídrico (evitar mau cheiro).'
            ],
            materials: [
                'Sifão extensível universal (PVC/PP).',
                'Anel de vedação de borracha.'
            ],
            measurement: 'Unidade (un) instalada.'
        }
    },

    // 8. Telhado
    {
        code: '16.02.040',
        description: 'Telha cerâmica tipo romana/francesa',
        unit: 'm²',
        price: 65.00,
        category: 'Telhado',
        detailedSpec: 'Fornecimento e assentamento de telhas cerâmicas tipo romana, portuguesa ou francesa, de primeira qualidade, sobre estrutura de madeira existente (ripamento), com sobreposição e encaixes adequados para garantir a estanqueidade.',
        memorialDef: {
            object: 'Cobertura da edificação para proteção contra intempéries.',
            methodology: [
                'Verificação do alinhamento e distanciamento das ripas (galga).',
                'Içamento das telhas com cuidado para evitar quebras.',
                'Assentamento iniciando do beiral para o cume, garantindo os encaixes.',
                'Fixação das telhas de beiral com arame ou prego (locais com vento).',
                'Recortes nos espigões e águas-furtadas.'
            ],
            materials: [
                'Telha cerâmica de barro cozido (Romana/Portuguesa) conforme NBR 15310.',
                'Arame galvanizado (se necessário).'
            ],
            measurement: 'Área inclinada de telhado recoberto (m²).'
        }
    },
    {
        code: '16.10.030',
        description: 'Calha em chapa galvanizada',
        unit: 'm',
        price: 80.00,
        category: 'Telhado',
        detailedSpec: 'Fornecimento e instalação de calha moldada em chapa de aço galvanizado nº 26 ou 24, desenvolvimento conforme local, fixada em suportes metálicos, incluindo soldas, vedações com silicone/PU e bocais de descida.',
        memorialDef: {
            object: 'Sistema de captação de águas pluviais do telhado.',
            methodology: [
                'Medição e confecção da calha na funilaria conforme desenvolvimento (largura da chapa).',
                'Instalação dos suportes a cada 1,00m ou nos caibros.',
                'Fixação da calha com declividade mínima de 0,5% em direção aos bocais.',
                'Rebitagem e vedação das emendas com selante PU e solda estanho.',
                'Teste de estanqueidade jogando água.'
            ],
            materials: [
                'Chapa de aço galvanizado #26.',
                'Selante PU (Poliuretano).',
                'Solda estanho e ácido.'
            ],
            measurement: 'Comprimento linear instalado (m).'
        }
    },
    {
        code: '16.30.010',
        description: 'Limpeza de calhas e condutores',
        unit: 'm',
        price: 15.00,
        category: 'Telhado',
        detailedSpec: 'Serviço de limpeza e desobstrução de calhas, rufos e condutores verticais de águas pluviais, com remoção de folhas, detritos e sedimentos, visando o perfeito escoamento das águas.',
        memorialDef: {
            object: 'Manutenção preventiva/corretiva do sistema de drenagem pluvial.',
            methodology: [
                'Remoção manual de folhas e detritos acumulados na calha.',
                'Desobstrução dos bocais e curvaturas dos condutores.',
                'Lavagem com jato de água para remoção de terra/lama.',
                'Verificação de pontos de vazamento ou oxidação.'
            ],
            materials: [
                'Sacos para entulho.',
                'Água sob pressão.'
            ],
            measurement: 'Comprimento linear limpo (m).'
        }
    },

    // 9. Limpeza Final
    {
        code: '55.01.020',
        description: 'Limpeza final de obra',
        unit: 'm²',
        price: 18.00,
        category: 'Limpeza',
        detailedSpec: 'Limpeza geral pós-obra, incluindo varrição e lavagem de pisos, limpeza de vidros, esquadrias, louças e metais sanitários, remoção de manchas de tinta e respingos de argamassa, deixando o imóvel pronto para uso.',
        memorialDef: {
            object: 'Higienização final para entrega da obra.',
            methodology: [
                'Remoção de todo entulho e restos de materiais.',
                'Raspagem de respingos de argamassa e tinta com espátula (s/ riscar).',
                'Limpeza dos vidros com limpa-vidros e água.',
                'Lavagem dos pisos com detergente neutro ou produto específico (pós-obra).',
                'Limpeza de louças e metais sanitários.'
            ],
            materials: [
                'Detergentes e desincrustantes (Pós-Obra).',
                'Vassouras, rodos e panos.',
                'Lã de aço (com cuidado).'
            ],
            measurement: 'Área total de construção limpa (m²).'
        }
    },
];
// ... (previous static array)

// Helper to get version info
export const getCatalogVersion = (): string => {
    try {
        const stored = localStorage.getItem('cdhu_update_data');
        if (stored) {
            const data = JSON.parse(stored);
            return data.version || 'Personalizado';
        }
    } catch (e) {
        console.error('Error reading catalog version', e);
    }
    return 'CDHU 197 (Base)';
};

// Main function to retrieve catalog with overrides
export const getCatalog = (): CDHUItem[] => {
    let overrides: Record<string, number> = {};

    try {
        const stored = localStorage.getItem('cdhu_update_data');
        if (stored) {
            const data = JSON.parse(stored);
            if (data.prices) {
                overrides = data.prices;
            }
        }
    } catch (e) {
        console.error('Error loading CDHU overrides', e);
    }

    return cdhuCatalog.map(item => {
        if (overrides[item.code]) {
            return {
                ...item,
                price: overrides[item.code], // Override price
                description: item.description + ' *' // Mark as updated
            };
        }
        return item;
    });
};
