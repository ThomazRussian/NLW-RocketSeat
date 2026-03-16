# tRPC Integration

## 1. Visão Geral

Implementar tRPC como camada de API/backend para o projeto Next.js 16, integrando com Server Components e SSR. O tRPC utilizará TanStack React Query (v5) para gerenciar estado de dados no cliente, com integração completa ao Next.js App Router.

- **Objetivo**: Criar API typesafe end-to-end sem necessidade de definir contratos manualmente
- **Stack**: tRPC v11, TanStack React Query v5, Next.js 16 (App Router), Zod
- **Referências**:
  - https://trpc.io/docs/client/tanstack-react-query/server-components
  - https://trpc.io/docs/client/tanstack-react-query/setup

---

## 2. Especificação Técnica

### 2.1 Dependências

```json
{
  "@trpc/server": "^11.x",
  "@trpc/client": "^11.x",
  "@trpc/tanstack-react-query": "^11.x",
  "@tanstack/react-query": "^5.x",
  "zod": "^3.x",
  "server-only": "^0.1.x",
  "superjson": "^3.x"
}
```

### 2.2 Estrutura de Arquivos

```
src/
├── trpc/
│   ├── init.ts              # Inicialização tRPC (t, createTRPCContext)
│   ├── query-client.ts      # Factory do QueryClient
│   ├── client.tsx           # Provider para Client Components
│   ├── server.tsx           # Utilitários para Server Components
│   └── routers/
│       ├── _app.ts          # Root router
│       └── submissions.ts  # Router de submissions (exemplo)
├── app/
│   ├── api/trpc/[trpc]/
│   │   └── route.ts         # API route handler (fetch adapter)
│   └── layout.tsx           # Adicionar TRPCReactProvider
```

### 2.3 Configuração de Inicialização (`trpc/init.ts`)

- `createTRPCContext`: Função que cria contexto da requisição (cache com React)
- `initTRPC.create()`: Configurações base (data transformer opcional com superjson)
- Exports: `createTRPCRouter`, `createCallerFactory`, `baseProcedure`

### 2.4 API Route (`app/api/trpc/[trpc]/route.ts`)

- Usar fetch adapter (`@trpc/server/adapters/fetch`)
- Expor GET e POST em `/api/trpc/*`

### 2.5 Query Client (`trpc/query-client.ts`)

- `staleTime`: 30s (evitar refetch imediato no cliente)
- `shouldDehydrateQuery`: incluir queries pendentes para streaming SSR
- Suporte a superjson para serialização (opcional)

### 2.6 Client Provider (`trpc/client.tsx`)

- `'use client'` directive
- `TRPCReactProvider`: envolve app com QueryClientProvider + TRPCProvider
- Gerenciar QueryClient instâncias separadas para server/client

### 2.7 Server Utilities (`trpc/server.tsx`)

- `getQueryClient`: cache do QueryClient por request
- `trpc`: proxy para chamar procedures via `createTRPCOptionsProxy`
- `caller`: para chamadas diretas em Server Components
- Helpers: `HydrateClient`, `prefetch`

### 2.8 Schema de Validação (Zod)

Integrar validações existentes do projeto. Exemplos baseados no schema atual:

```typescript
// submissions.zod.ts
import { z } from 'zod';

export const submissionSchema = z.object({
  id: z.string().uuid(),
  code: z.string().min(1),
  language: z.string().max(50),
  isRoastMode: z.boolean().default(true),
  score: z.coerce.number().min(0).max(100),
  roastText: z.string().min(1),
  createdAt: z.date(),
});

export const createSubmissionSchema = submissionSchema.omit({ id: true, createdAt: true, score: true, roastText: true });
```

### 2.9 Router de Exemplo (`trpc/routers/submissions.ts`)

```typescript
import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { db } from '@/db';
import { submissions } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';

export const submissionsRouter = createTRPCRouter({
  list: baseProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
      cursor: z.string().uuid().optional(),
    }))
    .query(async ({ input }) => {
      const data = await db
        .select()
        .from(submissions)
        .orderBy(desc(submissions.createdAt))
        .limit(input.limit);
      return { items: data, nextCursor: data.length === input.limit ? data[data.length - 1]?.id : null };
    }),

  byId: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const [submission] = await db
        .select()
        .from(submissions)
        .where(eq(submissions.id, input.id));
      return submission ?? null;
    }),

  // Mutation de exemplo
  // create: baseProcedure
  //   .input(createSubmissionSchema)
  //   .mutation(async ({ input }) => {
  //     const [created] = await db.insert(submissions).values(input).returning();
  //     return created;
  //   }),
});
```

---

## 3. To-Dos de Implementação

- [ ] **T1**: Instalar dependências do tRPC e TanStack React Query
- [ ] **T2**: Criar `src/trpc/init.ts` com inicialização tRPC
- [ ] **T3**: Criar `src/trpc/query-client.ts` com factory do QueryClient
- [ ] **T4**: Criar `src/trpc/routers/_app.ts` com root router
- [ ] **T5**: Criar `src/trpc/routers/submissions.ts` com procedures de exemplo
- [ ] **T6**: Criar API route `src/app/api/trpc/[trpc]/route.ts`
- [ ] **T7**: Criar `src/trpc/client.tsx` com TRPCReactProvider
- [ ] **T8**: Criar `src/trpc/server.tsx` com utilitários para Server Components
- [ ] **T9**: Atualizar `src/app/layout.tsx` para incluir TRPCReactProvider
- [ ] **T10**: Criar schema Zod para validação de submissions
- [ ] **T11**: Configurar superjson como data transformer (opcional)
- [ ] **T12**: Testar integração com Server Components

---

## 4. Requisitos Funcionais

- [ ] **R1**: API endpoint acessível em `/api/trpc/*` com suporte a GET e POST
- [ ] **R2**: Tipos inferidos automaticamente do router (end-to-end typesafety)
- [ ] **R3**: Integração com TanStack React Query v5 para cache e estado
- [ ] **R4**: Server Components podem prefetch queries usando `trpc.xxx.queryOptions()`
- [ ] **R5**: Client Components usam hooks `useTRPC()` + TanStack Query hooks
- [ ] **R6**: Dados são serializados corretamente entre server e client
- [ ] **R7**: Queries pendentes são incluídas no hydrate para streaming SSR
- [ ] **R8**: Suporte a mutations com validação Zod
- [ ] **R9**: Integração com Drizzle ORM existente

---

## 5. Padrões de Uso

### Server Component (Prefetch)
```typescript
import { prefetch, trpc } from '@/trpc/server';
import { HydrateClient } from '@/trpc/server';

export default async function Page() {
  prefetch(trpc.submissions.list.queryOptions({ limit: 10 }));
  
  return (
    <HydrateClient>
      <SubmissionsList />
    </HydrateClient>
  );
}
```

### Client Component
```typescript
'use client';
import { useTRPC } from '@/trpc/client';
import { useQuery } from '@tanstack/react-query';

export function SubmissionsList() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.submissions.list.queryOptions({ limit: 10 }));
  // ...
}
```

### Server Component (Direto)
```typescript
import { caller } from '@/trpc/server';

export default async function Page() {
  const data = await caller.submissions.list({ limit: 10 });
  // dados disponíveis diretamente no server
}
```
