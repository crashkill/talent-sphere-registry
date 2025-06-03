# Talent Sphere Registry - Sistema de Gestão de Profissionais HITSS

[![Deploy to GitHub Pages](https://github.com/crashkill/gestao-profissionais/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/crashkill/gestao-profissionais/actions/workflows/gh-pages.yml)

🔹 **Status do Deploy**: Configurando GitHub Pages...

> ⚠️ Por favor, verifique as configurações do GitHub Pages nas configurações do repositório.

Sistema moderno e elegante para gestão de talentos tecnológicos da HITSS, desenvolvido com React + TypeScript e Supabase.

## 🚀 Funcionalidades

- **Dashboard Interativo** - Visualizações e estatísticas em tempo real
- **Importação Excel** - Upload de planilhas de colaboradores
- **Formulário Manual** - Cadastro individual de profissionais  
- **Chat IA** - Consultas inteligentes sobre os dados (opcional)
- **Filtros Avançados** - Por tecnologias, senioridade, tipo de contrato
- **Gráficos Dinâmicos** - Análises visuais dos dados

## 🛠️ Tecnologias

- **Frontend:** React 18 + TypeScript, Vite, Tailwind CSS + Radix UI
- **Backend:** Supabase (PostgreSQL + API)
- **Extras:** Framer Motion, Recharts, Three.js
- **Deploy:** GitHub Pages com CI/CD

## ⚙️ Configuração

### 1. Credenciais Supabase (Obrigatório)

No GitHub, configure os seguintes **Secrets**:

```bash
VITE_SUPABASE_URL=https://pwksgdjjkryqryqrvyja.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3a3NnZGpqa3J5cXJ5cXJ2eWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcwMjA2NzcsImV4cCI6MjAzMjU5NjY3N30.CiVnO1vEUh4xLl2NzRlDvwJlj4xGfhpfJFAIYyZJkO8
```

### 2. Chat IA com Together.xyz (Opcional)

Para ativar o chat IA, configure também:

```bash
VITE_TOGETHER_API_KEY=sua_api_key_aqui
```

**Como obter a API Key:**
1. Crie conta grátis: https://api.together.xyz/
2. Acesse: https://api.together.xyz/settings/api-keys
3. Copie sua API key
4. Adicione nos GitHub Secrets

> **Nota:** O chat IA funciona com modelos open-source como DeepSeek, Llama, Qwen. Sem a API key, o sistema continua funcionando normalmente, apenas o chat ficará indisponível.

### 3. Como configurar GitHub Secrets

1. Vá em: `Settings` → `Secrets and variables` → `Actions`
2. Clique em `New repository secret`
3. Adicione cada variável individualmente
4. O deploy será feito automaticamente

## 🚀 Deploy

O sistema tem **CI/CD automático**:
- Push na branch `main` → Deploy automático
- URL: https://crashkill.github.io/gestao-profissionais/

## 📊 Status Atual

- ✅ **97 profissionais** cadastrados no Supabase
- ✅ **Dashboard funcionando** com filtros e gráficos
- ✅ **Import/Export Excel** operacional
- ✅ **Formulários** para cadastro manual
- ⚠️ **Chat IA** - Aguardando API key Together.xyz

## 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção  
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes React
│   ├── Dashboard.tsx
│   ├── ManualForm.tsx
│   ├── ExcelImport.tsx
│   ├── AIChat.tsx
│   └── ui/        # Componentes shadcn/ui
├── pages/         # Páginas principais
├── types/         # Definições TypeScript
├── hooks/         # Hooks customizados
└── lib/           # Utilitários e configurações
```

## 🏢 Sobre o Projeto

Sistema desenvolvido para a **HITSS** (Grupo Telefônica) para gestão eficiente de talentos tecnológicos, permitindo análises detalhadas de skills, senioridade e distribuição de colaboradores.

---

**Desenvolvido com ❤️ para a HITSS**

## Descrição

O Gestão Profissional HITSS é uma aplicação web moderna para gestão de profissionais de TI. A ferramenta permite:
- Importação de dados via Excel ou formulário manual
- Visualização de métricas e estatísticas
- Gestão de perfis profissionais
- Integração com Supabase para persistência de dados

## 🚀 Deploy Automático

O deploy para o GitHub Pages é feito automaticamente a cada push para a branch `main`. O site estará disponível em:

https://crashkill.github.io/gestao-profissionais/

### Fluxo de Deploy

1. Push para a branch `main`
2. GitHub Actions executa o workflow de deploy
3. A aplicação é construída e publicada na branch `gh-pages`
4. O GitHub Pages serve o conteúdo da branch `gh-pages`

### Deploy Manual

Para fazer deploy manualmente:

```bash
# Fazer build localmente
npm run build

# Fazer commit e push
./deploy.sh
```

## Instalação e Configuração

### Pré-requisitos

- Node.js >= 18.x
- npm ou yarn
- TypeScript

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/gestao-profissional-hitss.git

cd gestao-profissional-hitss

# Instalar dependências
npm install

# Copiar arquivo de configuração
cp .env.example .env

# Editar variáveis de ambiente no .env
# VITE_SUPABASE_URL=seu_projeto.supabase.co
# VITE_SUPABASE_ANON_KEY=sua_chave_anonima

# Iniciar servidor de desenvolvimento
npm run dev
```

## Estrutura do Projeto

```
src/
├── components/        # Componentes React reutilizáveis
├── hooks/            # Custom hooks
├── pages/            # Páginas da aplicação
├── types/            # Tipos TypeScript
├── services/         # Serviços e integrações
└── utils/           # Funções utilitárias
```

## Funcionalidades Principais

### Dashboard

- Visualização de métricas e gráficos
- Análise de skills e proficiência
- Filtros e agrupamentos

### Excel Import

- Importação de dados via arquivo Excel
- Validação de formato
- Template de importação
- Processamento em lote

### Manual Form

- Cadastro manual de profissionais
- Validação de dados
- Interface responsiva

## Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript, Vite
- **UI:** Tailwind CSS, Shadcn UI
- **State Management:** React Context
- **Formulários:** React Hook Form
- **Integração:** Supabase
- **Animações:** Framer Motion
- **Gráficos:** Recharts

## Contribuição

1. Clone o repositório
2. Crie uma branch para sua feature
3. Faça commit das mudanças
4. Abra um Pull Request

## Documentação Técnica

Para mais detalhes sobre a implementação e arquitetura do projeto, consulte o arquivo [DOCS.md](DOCS.md).

## Licença

MIT License
