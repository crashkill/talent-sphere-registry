# Talent Sphere Registry

[![Deploy to GitHub Pages](https://github.com/crashkill/talent-sphere-registry/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/crashkill/talent-sphere-registry/actions/workflows/gh-pages.yml)

🔹 **Status do Deploy**: Configurando GitHub Pages...

> ⚠️ Por favor, verifique as configurações do GitHub Pages nas configurações do repositório.

Sistema de gestão de talentos tecnológicos para a HITSS.

## Descrição

O Gestão Profissional HITSS é uma aplicação web moderna para gestão de profissionais de TI. A ferramenta permite:
- Importação de dados via Excel ou formulário manual
- Visualização de métricas e estatísticas
- Gestão de perfis profissionais
- Integração com Supabase para persistência de dados

## 🚀 Deploy Automático

O deploy para o GitHub Pages é feito automaticamente a cada push para a branch `main`. O site estará disponível em:

https://crashkill.github.io/talent-sphere-registry/

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
