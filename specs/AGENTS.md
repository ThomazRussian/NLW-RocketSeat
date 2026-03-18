# Padrões de Especificações

## Localização
`specs/` - Pasta raiz do projeto

## Formato de Spec

Cada spec deve conter:

### 1. Visão Geral
- Objetivo breve
- Stack/tecnologias utilizadas
- Referências úteis

### 2. Especificação Técnica
- Estrutura de dados (tabelas, tipos, interfaces)
- Arquitetura/diagrama se necessário
- APIs/Server Actions
- Endpoints
- Schemas

### 3. To-Dos de Implementação
Lista de tarefas com checkboxes:
```markdown
- [ ] **T1**: Descrição da tarefa
- [x] **T2**: Tarefa concluída
```

### 4. Requisitos Funcionais
Lista de requisitos com checkboxes.

---

## Nomenclatura

- **Nome do arquivo**: `{feature-name}.md` (kebab-case)
- **Exemplos**:
  - `trpc.md`
  - `drizzle.md`
  - `authentication.md`
  - `editor-syntax-highlight.md`

## Exemplo de Spec

```markdown
# Nome da Feature

## 1. Visão Geral

Breve descrição do objetivo e tecnologias.

## 2. Especificação Técnica

### 2.1 Estrutura
```
src/
└── ...
```

### 2.2 Interface
```typescript
interface MyFeature {
  id: string;
  // ...
}
```

## 3. To-Dos de Implementação

- [ ] **T1**: Primeira tarefa
- [x] **T2**: Segunda tarefa concluída

## 4. Requisitos Funcionais

- [ ] **R1**: Primeiro requisito
- [ ] **R2**: Segundo requisito
```

## Processo

1. Criar spec antes de implementar feature
2. Documentar decisões técnicas
3. Manter checkboxes atualizados
4. Specs são living documents - atualizar conforme evolução
