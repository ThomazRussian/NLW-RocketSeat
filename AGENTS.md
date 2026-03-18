# devroast

## Stack
- Next.js 16, React 19, Tailwind CSS 4, TypeScript
- Drizzle ORM + PostgreSQL (banco de dados)
- tRPC + TanStack Query (API)
- Shiki (syntax highlighting)
- Biome (linting/formatting)

## Estrutura

```
src/
├── app/                    # Rotas Next.js (App Router)
│   ├── [roast]/            # Rotas dinâmicas
│   ├── actions.ts          # Server Actions
│   ├── layout.tsx          # Layout raiz
│   └── page.tsx            # Home
├── components/             # Componentes React
│   ├── ui/                 # Componentes UI reutilizáveis
│   └── navbar.tsx          # Navbar global
├── db/                     # Drizzle ORM
│   ├── schema.ts           # Definições de tabelas
│   └── index.ts            # Conexão com banco
├── trpc/                   # tRPC
│   ├── init.ts             # Inicialização tRPC
│   ├── client.tsx          # Provider para Client Components
│   ├── server.tsx          # Utilitários para Server Components
│   └── routers/            # Routers tRPC
└── lib/                    # Utilitários
    └── queries.ts          # Queries de banco
```

## Padrões Globais

### Tipos de Arquivos
- `.tsx` - Componentes React
- `.ts` - Utilitários e lógica
- `.css` - Estilos Tailwind

### Exports
- Usar **named exports** apenas (nunca default exports)

### Linting/Formatting
- Biome configurado em `biome.json`
- Scripts: `npm run lint`, `npm run format`

### Cores do Design System
Usar classes Tailwind com cores do tema:
- `text-accent-green`, `text-accent-red`, `text-accent-amber`
- `bg-bg-page`, `bg-bg-surface`, `bg-bg-elevated`
- `text-text-primary`, `text-text-secondary`, `text-text-tertiary`
- `border-border`, `border-border-primary`

### Fontes
- JetBrains Mono (mono) via `--font-mono`
- Usar classe `font-mono` para textos de código

---

## Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build produção
npm run lint         # Verificar lint
npm run format       # Formatar código
npm run db:up        # Subir PostgreSQL (Docker)
npm run db:down      # Parar PostgreSQL
npm run db:push      # Sincronizar schema com banco
npm run db:seed      # Popular banco com dados de teste
```
