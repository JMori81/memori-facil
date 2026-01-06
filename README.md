# MeMori Fácil

# MeMori Fácil - Memorial Descritivo Inteligente

**MeMori Fácil** é uma aplicação web moderna desenvolvida para simplificar e agilizar a criação de documentos essenciais para a contratação de serviços de engenharia. A ferramenta auxilia gestores e engenheiros na elaboração de Memoriais Descritivos, Estudos Técnicos Preliminares (ETP), Diagramas de Fluxo de Dados (DFD) e Orçamentos, integrando-se diretamente com o catálogo de serviços da CDHU.

## 🚀 Funcionalidades Principais

- **Painel de Controle (Dashboard)**: Visão centralizada de todos os projetos, status e ações rápidas.
- **Gerenciamento de Projetos**: Cadastro detalhado de obras, incluindo objeto, localização e datas.
- **Catálogo CDHU Integrado**: Acesso direto aos serviços e insumos da CDHU para composição precisa de orçamentos e especificações técnicas.
- **Geradores de Artefatos Inteligentes**:
  - **Memorial Descritivo**: Geração automática de textos técnicos baseados nos serviços selecionados.
  - **Orçamento (Planilha)**: Criação de planilhas orçamentárias detalhadas, exportáveis para Excel.
  - **ETP (Estudo Técnico Preliminar)**: Editores dedicados para as fases de "Início" e "Conclusão" do ETP.
  - **DFD (Diagrama de Fluxo de Dados)**: Ferramenta visual para modelar fluxos e processos de documentos.
- **Sincronização na Nuvem**: Integração com **Supabase** para salvar e sincronizar o progresso dos projetos em tempo real.
- **Exportação**: Suporte nativo para exportação de documentos em **PDF** e planilhas **XLSX**.

## 🛠️ Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e performática:

- **Frontend**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem**: [TypeScript](https://www.typescriptlang.org/)
- **Estilização**: [TailwindCSS](https://tailwindcss.com/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **Backend / Database**: [Supabase](https://supabase.com/)
- **Manipulação de Arquivos**:
  - `jsPDF` e `html2canvas` para geração de PDFs via frontend.
  - `xlsx` para manipulação e exportação de planilhas.

## 📦 Instalação e Configuração

### Pré-requisitos

- **Node.js**: Versão 18 ou superior recomendada.
- **Gerenciador de Pacotes**: npm ou yarn.

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/JMori81/memori-facil.git
   cd memori-facil
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configuração de Variáveis de Ambiente**
   Crie um arquivo `.env.local` na raiz do projeto com as credenciais do seu projeto Supabase:
   ```env
   VITE_SUPABASE_URL=sua_url_do_supabase
   VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
   ```

4. **Inicie o Servidor de Desenvolvimento**
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:5173`.

## 🏗️ Build para Produção

Para gerar a versão otimizada para produção:

```bash
npm run build
```

Os arquivos estáticos serão gerados na pasta `dist/`, prontos para deploy (Vercel, Netlify, etc.).

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir _issues_ para relatar bugs ou sugerir novas funcionalidades, e enviar _pull requests_ com melhorias.

## 📄 Licença

Este projeto é distribuído sob a licença MIT.


## Contato
Desenvolvedor: JMori81
