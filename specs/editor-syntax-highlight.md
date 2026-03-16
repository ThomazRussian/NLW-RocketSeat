# Especificação: Editor de Código com Syntax Highlight

## 1. Resumo da Pesquisa

### Abordagem do Ray-So
O Ray-So (github.com/raycast/ray-so) utiliza:
- **Shiki** como motor de syntax highlighting
- Usa TextMate grammars (mesmo engine do VS Code)
- Languages carregadas sob demanda (lazy loading)
- O highlight.js também está no projeto, possivelmente para detecção automática de linguagem

### Libraries Alternativas

| Library | Detecção Auto | Languages | Tamanho Bundle | Qualidade Highlight |
|---------|--------------|-----------|----------------|-------------------|
| **Shiki** | ❌ Não nativamente | 200+ | ~1.3MB gz | Excelente (VS Code) |
| **highlight.js** | ✅ Sim | 190+ | ~30KB gz | Boa |
| **Prism.js** | ⚠️ Básica | 300+ | ~15KB gz | Boa |

### Recomendação
**Shiki** é a melhor opção porque:
1. Alta qualidade de highlighting (mesmo engine do VS Code)
2. Já está instalado no projeto (`shiki: ^4.0.2`)
3. SuportaThemes e linguagens via lazy loading
4. Gera HTML com inline styles (zero JS no cliente)

### Detecção Automática de Linguagem

Para detecção automática, há duas abordagens:

1. **highlight.js** (`hljs.highlightAuto()`)
   - Detecção por scoring de linguagens
   - Simples, sem dependências extras
   - ~70-80% de precisão

2. **@vscode/vscode-languagedetection** (ML)
   - Usa modelo treinado da Microsoft
   - Mais preciso que pattern matching
   - Requer download adicional (~1MB)

---

## 2. Especificação de Implementação

### 2.1 Requisitos Funcionais

- [ ] Componente Editor que permite entrada de código via paste/typing
- [ ] Syntax highlight aplicado automaticamente após entrada de código
- [ ] Detecção automática de linguagem (sem input manual do usuário)
- [ ] Suporte às linguagens mais populares: JavaScript, TypeScript, Python, Go, Rust, HTML, CSS, JSON, SQL, Bash, Java, C++, Ruby, PHP, Swift, Kotlin
- [ ] Tema visual configurável (claro/escuro)
- [ ] Modo visualização apenas (após paste, código fica travado/somente leitura)
- [ ] Limite máximo de 100 linhas de código
- [ ] Números de linha no lado esquerdo do código

### 2.2 Arquitetura

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   EditorInput   │────▶│  LanguageDetect  │────▶│   ShikiHighlight│
│  (textarea ou   │     │  (highlight.js)  │     │   (codeToHtml)  │
│   contenteditable│     │                  │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
```

### 2.3 Fluxo de Dados

1. Usuário cola/escreve código no editor
2. Sistema captura o código
3. **highlight.js** detecta a linguagem automaticamente
4. **Shiki** aplica o syntax highlight com a linguagem detectada
5. Renderiza HTML com cores

### 2.4 Stack Recomendado

| Dependência | Versão | Uso |
|-------------|--------|-----|
| shiki | ^4.0.2 | Syntax highlighting |
| highlight.js | ^11.x | Detecção automática de linguagem |

---

## 3. To-Dos de Implementação

- [ ] **T1**: Configurar highlight.js para detecção automática de linguagem
- [ ] **T2**: Criar componente `CodeEditor` com textarea para input
- [ ] **T3**: Integrar Shiki para rendering do código destacado
- [ ] **T4**: Implementar fluxo: input → detect → highlight → render
- [ ] **T5**: Adicionar suporte a temas (light/dark)
- [ ] **T6**: Testar com diferentes linguagens

---

- [ ] O editor precisa de números de linha? **R: Sim, incluir**

## 4. Perguntas em Aberto

- [ ] ~~O editor deve permitir edição do código ou apenas visualização após paste?~~ **R: Apenas visualização (código travado após paste)**
- [ ] ~~Qual comportamento esperado para códigos muito longos (performance)?~~ **R: Limite de 100 linhas**
- [ ] ~~O editor precisa de números de linha?~~ **R: Sim, incluir**
- [ ] ~~Deve haver opção de copiar o código destacado?~~ **R: Não precisa**
