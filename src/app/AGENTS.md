# Padrões de Páginas (App Router)

## Estrutura de Rotas

```
src/app/
├── page.tsx           # Home (/)
├── layout.tsx         # Layout raiz (com Navbar, TRPCProvider)
├── leaderboard/
│   └── page.tsx      # Leaderboard estático (SSR)
├── roast/
│   └── [id]/
│       └── page.tsx  # Página de resultado (SSR dinâmico)
└── components/
    └── page.tsx      # Showcase de componentes
```

## Metadata

Todas as páginas devem exportar `metadata` para SEO:

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Título da Página | devroast",
  description: "Descrição da página para SEO.",
};
```

## Server vs Client Components

### Server Components (Padrão)
- Páginas com dados estáticos ou SSR
- Podem usar `async/await` diretamente
- Acesso direto a banco via `lib/queries`
- SEO-friendly (renderiza no servidor)

```tsx
// src/app/leaderboard/page.tsx
export default async function LeaderboardPage() {
  const data = await getLeaderboard(10);
  return <div>{/* ... */}</div>;
}
```

### Client Components ("use client")
- Interatividade (useState, useEffect)
- Eventos de click
- Hooks do React Query

```tsx
"use client";

import { useState } from "react";

export function CodeEditor() {
  const [code, setCode] = useState("");
  // ...
}
```

## Rotas Dinâmicas

Para páginas com parâmetros de URL (ex: `/roast/[id]`):

```tsx
export default async function RoastResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // ...
}
```

## Layout Raiz

O `layout.tsx` raiz inclui:
- `JetBrains_Mono` font
- `TRPCReactProvider`
- `Navbar`
- `main` container

```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${jetbrainsMono.variable} bg-bg-page text-text-primary`}>
        <TRPCReactProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
```

## Server Actions

Usar Server Actions para mutações quando tRPC não for necessário:

```tsx
// src/app/actions.ts
"use server";

import { submitCode } from "@/lib/queries";

export async function submitCodeAction(
  code: string,
  language: string,
  isRoastMode: boolean
) {
  return submitCode(code, language, isRoastMode);
}
```

## Estilização de Páginas

Usar classes Tailwind consistentes:
- Container: `flex flex-col items-center w-full max-w-[960px] mx-auto px-10`
- Seções: `flex flex-col gap-10 w-full`
- Títulos: `text-accent-green font-mono text-sm font-bold`
- Dividers: `border-t border-border`
