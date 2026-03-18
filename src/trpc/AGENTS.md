# Padrões de API (tRPC)

## Estrutura

```
src/trpc/
├── init.ts              # Inicialização tRPC
├── query-client.ts      # Factory do QueryClient
├── client.tsx           # Provider para Client Components
├── server.tsx           # Utilitários para Server Components
├── server-caller.ts     # Caller para Server Components
└── routers/
    ├── _app.ts          # Root router
    └── metrics.ts       # Router de exemplo
```

## Inicialização

### `init.ts`

```typescript
import { initTRPC } from "@trpc/server";
import { cache } from "react";

export const createTRPCContext = cache(async () => {
  return {};
});

const t = initTRPC.create();

export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
```

## Routers

### Estrutura de Router

```typescript
// src/trpc/routers/submissions.ts
import { z } from "zod";
import { baseProcedure, createTRPCRouter } from "../init";
import { db } from "@/db";
import { submissions } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export const submissionsRouter = createTRPCRouter({
  list: baseProcedure
    .input(z.object({
      limit: z.number().min(1).max(100).default(20),
    }))
    .query(async ({ input }) => {
      const data = await db
        .select()
        .from(submissions)
        .orderBy(desc(submissions.createdAt))
        .limit(input.limit);
      return data;
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
});
```

### Root Router

```typescript
// src/trpc/routers/_app.ts
import { createTRPCRouter } from "../init";
import { submissionsRouter } from "./submissions";
import { metricsRouter } from "./metrics";

export const appRouter = createTRPCRouter({
  submissions: submissionsRouter,
  metrics: metricsRouter,
});

export type AppRouter = typeof appRouter;
```

## Client Components

### Provider

```typescript
// src/trpc/client.tsx
"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./server";

function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
```

### Hook de Uso

```typescript
// src/trpc/client.tsx
export function useTRPC() {
  return trpc.useUtils();
}
```

## Server Components

### Server Utilities

```typescript
// src/trpc/server.tsx
"server-only";

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { cache } from "react";
import { createTRPCContext } from "./init";
import { makeQueryClient } from "./query-client";
import { appRouter } from "./routers/_app";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
});

export function HydrateClient(props: { children: React.ReactNode }) {
  return <div suppressHydrationWarning>{props.children}</div>;
}
```

### Uso em Server Components

```typescript
import { caller } from "@/trpc/server";

export default async function Page() {
  const data = await caller.submissions.list({ limit: 10 });
  return <div>{/* ... */}</div>;
}
```

## API Route

```typescript
// src/app/api/trpc/[trpc]/route.ts
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from "@/trpc/routers/_app";
import { createTRPCContext } from "@/trpc/init";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  });

export { handler as GET, handler as POST };
```
