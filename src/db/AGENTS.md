# Padrões de Banco de Dados (Drizzle ORM)

## Estrutura

```
src/db/
├── index.ts       # Conexão com banco
├── schema.ts      # Definições de tabelas e tipos
└── seed.ts        # Seed do banco

src/lib/
└── queries.ts     # Funções de query
```

## Schema

### Definição de Tabelas

Usar `pgTable` do Drizzle com tipagem forte:

```typescript
import { pgTable, pgEnum, uuid, text, varchar, boolean, decimal, timestamp } from "drizzle-orm/pg-core";

export const languageEnum = pgEnum("language", [
  "javascript",
  "typescript",
  "python",
  // ...
]);

export const submissions = pgTable("submissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  code: text("code").notNull(),
  language: varchar("language", { length: 50 }).notNull(),
  isRoastMode: boolean("isRoastMode").notNull().default(true),
  score: decimal("score", { precision: 3, scale: 1 }).notNull(),
  roastText: text("roastText").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});
```

### Tipos Inferidos

Exportar tipos para uso no código:

```typescript
export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
```

## Conexão

```typescript
// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import "server-only";

const connectionString = process.env.DATABASE_URL!;

const client = postgres(connectionString);
export const db = drizzle(client);
```

## Queries

### Funções de Query

Criar funções reutilizáveis em `src/lib/queries.ts`:

```typescript
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function submitCode(
  code: string,
  language: string,
  isRoastMode: boolean
): Promise<Submission> {
  const score = (Math.random() * 10).toFixed(1);
  const roastText = isRoastMode
    ? MOCK_ROASTS[Math.floor(Math.random() * MOCK_ROASTS.length)]
    : `Code analysis: ${language} code detected.`;

  const result = await db.execute(
    sql`INSERT INTO submissions (code, language, "isRoastMode", score, "roastText")
     VALUES (${code}, ${language}, ${isRoastMode}, ${score}, ${roastText})
     RETURNING *`
  );

  return result[0] as unknown as Submission;
}

export async function getLeaderboard(limit = 10): Promise<Submission[]> {
  const result = await db.execute(
    sql`SELECT * FROM submissions
     ORDER BY score ASC
     LIMIT ${limit}`
  );

  return result as unknown as Submission[];
}
```

## Docker Compose

### PostgreSQL Local

```yaml
# docker-compose.yml
services:
  postgres:
    image: postgres:16-alpine
    container_name: devroast-db
    environment:
      POSTGRES_USER: devroast
      POSTGRES_PASSWORD: devroast
      POSTGRES_DB: devroast
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
```

### Scripts

```bash
npm run db:up        # docker compose up -d
npm run db:down      # docker compose down
npm run db:push      # drizzle-kit push (sync schema)
npm run db:seed      # tsx src/db/seed.ts
npm run db:studio    # drizzle-kit studio
```

## Nomenclatura

- Tabelas: `snake_case` (ex: `submissions`, `user_codes`)
- Colunas: `camelCase` no schema, `snake_case` no DB
- Enum values: `snake_case` (ex: `javascript`, `typescript`)
