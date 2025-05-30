# Bem-vindo ao seu projeto Lovable

## Informações do Projeto

**URL**: https://lovable.dev/projects/9b7fa240-213d-4bd6-b987-910516f6564a

## Como posso editar este código?

Existem várias maneiras de editar sua aplicação.

**Use o Lovable**

Simplesmente visite o [Projeto Lovable](https://lovable.dev/projects/9b7fa240-213d-4bd6-b987-910516f6564a) e comece a interagir.

As alterações feitas via Lovable serão commitadas automaticamente neste repositório.

**Use sua IDE preferida**

Se você deseja trabalhar localmente usando sua própria IDE, pode clonar este repositório e enviar as alterações (push). As alterações enviadas também serão refletidas no Lovable.

O único requisito é ter Node.js e npm instalados - [instale com nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Siga estes passos:

```sh
# Passo 1: Clone o repositório usando a URL Git do projeto.
git clone <SUA_URL_GIT>

# Passo 2: Navegue até o diretório do projeto.
cd <NOME_DO_SEU_PROJETO>

# Passo 3: Instale as dependências necessárias.
npm i

# Passo 4: Inicie o servidor de desenvolvimento com recarregamento automático e visualização instantânea.
npm run dev
```

**Edite um arquivo diretamente no GitHub**

- Navegue até o(s) arquivo(s) desejado(s).
- Clique no botão "Editar" (ícone de lápis) no canto superior direito da visualização do arquivo.
- Faça suas alterações e confirme (commit) as alterações.

**Use o GitHub Codespaces**

- Navegue até a página principal do seu repositório.
- Clique no botão "Code" (botão verde) próximo ao canto superior direito.
- Selecione a aba "Codespaces".
- Clique em "New codespace" para iniciar um novo ambiente Codespace.
- Edite os arquivos diretamente no Codespace e confirme (commit) e envie (push) suas alterações quando terminar.

## Regras de Processamento de Dados

Ao processar o arquivo `Cadastro Colaboradores - FSW São Paulo(1-85).xlsx`, especificamente a planilha `Respostas`, as seguintes colunas devem ser **ignoradas**:
- `ID`
- `Hora de Início`
- `Hora de Conclusão`
- `Nome` (a coluna simples `Nome`, não `Nome Completo`)

Todas as outras colunas desta planilha são relevantes para a aplicação e devem ser consideradas para armazenamento no Supabase.

## Integrações e Ferramentas

Este projeto integra-se com o Supabase para gerenciamento de banco de dados. As chaves de acesso e outras configurações do Supabase são obtidas e gerenciadas através do Supabase MCP (Model Context Protocol), garantindo uma interação segura e eficiente com os serviços Supabase.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9b7fa240-213d-4bd6-b987-910516f6564a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
