# Padrões de Utilitários (lib)

## Estrutura

```
src/lib/
├── queries.ts     # Funções de query do banco
└── utils.ts       # Utilitários gerais (se necessário)
```

## Queries

Funções de query devem ser usadas em:
- Server Components
- Server Actions
- tRPC procedures

### Estrutura

```typescript
import { db } from "@/db";
import { sql } from "drizzle-orm";
import type { Submission } from "@/db/schema";

export async function getLeaderboard(limit = 10): Promise<Submission[]> {
  const result = await db.execute(
    sql`SELECT id, code, language, "isRoastMode", score, "roastText", "createdAt"
     FROM submissions
     ORDER BY score ASC
     LIMIT ${limit}`
  );

  return result as unknown as Submission[];
}
```

### Server-only

Queries devem ser `server-only` - nunca importar diretamente em Client Components:

```typescript
// NO client component
import { getLeaderboard } from "@/lib/queries"; // ❌ NÃO FAZER

// NO Server Action
"use server";
import { getLeaderboard } from "@/lib/queries"; // ✅ OK
```

Para Client Components, usar tRPC ou Server Actions.

### Paralelização de Queries

Quando múltiplas queries não dependem umas das outras, usar `Promise.all` para execução paralela:

```typescript
// ✅ CORRETO - queries executam em paralelo
export async function LeaderboardSection() {
  const [submissions, totalCount] = await Promise.all([
    getLeaderboard(3),
    getAllSubmissionsCount(),
  ]);
  // ...
}

// ❌ INCORRETO - queries executam sequencialmente
export async function LeaderboardSection() {
  const submissions = await getLeaderboard(3);       // espera terminar
  const totalCount = await getAllSubmissionsCount(); // só então executa
  // ...
}
```

**Quando usar:**
- Queries que não dependem do resultado de outra
- Melhora performance significativamente em páginas com múltiplas queries

**Quando NÃO usar:**
- Queries com dependência (ex: buscar usuário antes de buscar posts dele)
- Queries que devem ser executadas em ordem específica por lógica de negócio
