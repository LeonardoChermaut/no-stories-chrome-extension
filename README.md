# NO STORIES

O **NO STORIES** é uma extensão para Google Chrome que remove as seções de "Stories" do Facebook e do Instagram, além de limpar posts patrocinados (anúncios) no feed do Facebook.
O projeto não rastreia dados, não exibe anúncios próprios e roda localmente no navegador.

## Funcionalidades

- **Facebook**: Remove o carrossel de stories e posts patrocinados.
- **Instagram**: Esconde a barra de stories.
- **Controle**: Ativação individual para cada bloqueio via popup.

## Instalação

A instalação é feita manualmente pelo Modo do Desenvolvedor.

1. Clone o repositório ou baixe e extraia o arquivo ZIP.
   ```bash
   git clone https://github.com/LeonardoChermaut/no-stories-chrome-extension.git
   ```
2. Acesse `chrome://extensions` no navegador.
3. Ative a opção **Modo do desenvolvedor** no canto superior direito.
4. Clique em **Carregar sem compactação**.
5. Selecione a pasta do projeto.

## Uso

1. Clique no ícone da extensão na barra de ferramentas.
2. Utilize as caixas de seleção para ativar ou desativar o bloqueio de Stories ou Anúncios.
3. A página recarregará automaticamente ao desativar uma configuração para restaurar a exibição original.

## Testes

O projeto inclui testes unitários para validar a lógica de remoção.

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Execute os testes:
   ```bash
   npm test
   ```
