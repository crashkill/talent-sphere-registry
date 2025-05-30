# Documentação Técnica - Gestão Profissional HITSS

## Visão Geral

O Gestão Profissional HITSS é uma aplicação web moderna para gestão de profissionais de TI, construída com React, TypeScript e Vite. A aplicação permite:
- Importação de dados via Excel ou formulário manual
- Visualização de métricas e estatísticas
- Gestão de perfis profissionais
- Integração com Supabase para persistência de dados

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

## Configuração do Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` baseado no template `.env.example`:

```
VITE_SUPABASE_URL=seu_projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### Dependências

- Node.js >= 18.x
- npm ou yarn
- TypeScript
- React 18+
- Vite
- Supabase
- Tailwind CSS

## Componentes Principais

### Dashboard

- Visualização de métricas e gráficos
- Análise de skills e proficiência
- Filtros e agrupamentos

### ExcelImport

- Importação de dados via arquivo Excel
- Validação de formato
- Template de importação
- Processamento em lote

### ManualForm

- Cadastro manual de profissionais
- Validação de dados
- Interface responsiva

### ProfessionalUpdate

- Edição detalhada do perfil do profissional
- Atualização de nível de proficiência
- Gestão de habilidades e certificações
- Histórico de alterações
- Sistema de aprovação para mudanças significativas

## API e Integrações

### Supabase

- Persistência de dados
- Autenticação
- Armazenamento de arquivos
- Real-time updates

### Endpoints

#### Profissionais
- POST /api/professionals
- GET /api/professionals
- PUT /api/professionals/:id
- DELETE /api/professionals/:id

#### Skills
- GET /api/skills
- POST /api/skills
- GET /api/skills/stats

## Tecnologias Utilizadas

- **Frontend:** React 18, TypeScript, Vite
- **UI:** Tailwind CSS, Shadcn UI
- **State Management:** React Context
- **Formulários:** React Hook Form
- **Integração:** Supabase
- **Animações:** Framer Motion
- **Gráficos:** Recharts

## Guia de Desenvolvimento

### Iniciando o Projeto

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

### Contribuição

1. Clone o repositório
2. Configure as variáveis de ambiente
3. Crie uma branch para sua feature
4. Faça commit das mudanças
5. Abra um Pull Request

## Licença

MIT License
