# ![](./icons/icon32.png) Grok Imagine Plus 

**Grok Imagine Plus** é uma extensão para Google Chrome projetada para potencializar a criação e visualização de mídia no site [Grok.com](https://grok.com/imagine/post/). Esta ferramenta unifica um poderoso gerenciador de prompts com controles avançados de vídeo e manipulação dinâmica de interface.

## ✨ Funcionalidades

### 📝 Gestor de Prompts
* **Organização Eficiente**: Salve, edite e organize seus prompts favoritos em uma lista intuitiva.
* **Modos de Inserção**: Escolha entre substituir o texto atual ou anexar ao final da linha via botão `⇄ MODE`.
* **Backup e Portabilidade**: Exportação e importação completa da sua biblioteca de prompts via arquivos JSON (`📤` / `📥`).
* **Interface Inteligente**: A lista de prompts inicia **recolhida (Collapsed Down)** para não obstruir a visão, podendo ser expandida clicando no ícone `▼`.

### 🎬 Controles de Vídeo e Mídia
* **Controles Nativos**: Habilite os controles padrão do navegador (play, barra de progresso, volume) nos vídeos gerados pelo Grok através do botão `🎬 Controls`.
* **Tela Cheia (Fullscreen)**: Botão dedicado (`◻`) para expandir vídeos para visualização em tela cheia.
* **Zoom Dinâmico**: Aumente ou diminua o zoom da mídia (0.5x até 5x) usando os botões `🔍+` e `🔍-`.

### 📏 Redimensionamento Proporcional
* **Ajuste de Largura (W)**: Altere a largura da mídia em blocos de 50px através dos botões `➕` e `➖`.
* **Proporção Automática**: A altura é recalculada automaticamente com base na proporção real da mídia detectada em tempo real (Aspect Ratio).
* **Reset Instantâneo**: O botão `🔄` retorna o zoom, os controles e as dimensões aos valores originais de fábrica.

### ⚙️ Gestão de Categorias Fixas
* **Personalização de Atalhos**: Agora é possível filtrar quais grupos de botões aparecem na interface (Básico, Roupa, Atleta, Extras) através do botão de configuração.
* **Persistência**: Suas preferências são salvas no navegador, mantendo a interface organizada conforme seu uso.

## 🛠️ Instalação (Modo Desenvolvedor)

Como esta versão personalizada contém melhorias específicas, você pode instalá-la manualmente:

1. Faça o download ou clone este repositório.
2. No Chrome, acesse `chrome://extensions/`.
3. Ative o **Modo do Desenvolvedor** (canto superior direito).
4. Clique em **Carregar sem compactação** e selecione a pasta onde os arquivos foram extraídos.
5. Acesse o [Grok Imagine](https://grok.com/imagine/post/) e aproveite as novas ferramentas.

## 📄 Licença

Este projeto está sob a **Licença MIT**. Você é livre para copiar, modificar e distribuir o código, desde que mantenha os créditos originais.

## 🤝 Créditos

* **Inspiração Original**: Baseado na extensão [Grok Imagine Prompt Manager](https://chromewebstore.google.com/detail/grok-imagine-prompt-manag/idhpepfjeolmigknpjjokomjloobppdj).
* **Desenvolvimento**: Aproximadamente 99% do código e lógica de implementação foram gerados em colaboração com o **Gemini AI (Google)**.
* **Correções de Estabilidade**: Agradecimentos especiais ao suporte técnico da Gemini por resolver os erros de "Context Invalidated" e otimizar a captura dinâmica de dimensões.

---
*Nota: Esta extensão não é afiliada ao x.ai ou ao Grok.*