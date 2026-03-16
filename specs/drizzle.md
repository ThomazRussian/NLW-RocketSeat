# Especificação: Drizzle ORM + PostgreSQL

## 1. Visão Geral

### Objetivo
Configurar Drizzle ORM com PostgreSQL (via Docker Compose) para persistência de dados do devroast.

### Stack
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Infra**: Docker Compose

---

## 2. Tabelas

### 2.1 `submissions`

| Coluna | Tipo | Constraints | Descrição |
|--------|------|-------------|-----------|
| `id` | `uuid` | PK, DEFAULT gen_random_uuid() | ID único da submissão |
| `code` | `text` | NOT NULL | Código fonte submetido |
| `language` | `varchar(50)` | NOT NULL | Linguagem detectada |
| `is_roast_mode` | `boolean` | NOT NULL, DEFAULT true | Se modo roast está ativo |
| `score` | `decimal(3,1)` | NOT NULL | Score de 0-10 |
| `roast_text` | `text` | NOT NULL | Texto do roast |
| `created_at` | `timestamptz` | NOT NULL, DEFAULT now() | Data de criação |

### 2.2 `leaderboard` (view)

View materializada ou query para ranking por score ASC (menor = mais shame).

```sql
CREATE VIEW leaderboard_view AS
SELECT 
  ROW_NUMBER() OVER (ORDER BY score ASC) as rank,
  id,
  code,
  language,
  score,
  created_at
FROM submissions
ORDER BY score ASC;
```

---

## 3. Enums

### 3.1 `language`

Linguagens suportadas para detecção automática:

```typescript
export const languageEnum = pgEnum('language', [
  'javascript',
  'typescript',
  'python',
  'go',
  'rust',
  'java',
  'cpp',
  'c',
  'ruby',
  'php',
  'swift',
  'kotlin',
  'html',
  'css',
  'json',
  'sql',
  'bash',
  'markdown',
  'unknown',
]);
```

---

## 4. Docker Compose

### `docker-compose.yml`

```yaml
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
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U devroast"]
      interval: 5s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

---

## 5. Configuração Drizzle

### 5.1 Dependências

```bash
npm install drizzle-orm postgres dotenv
npm install -D drizzle-kit
```

### 5.2 Estrutura de arquivos

```
src/
├── db/
│   ├── index.ts       # conexão com banco
│   ├── schema.ts      # definições de tabelas
│   └── migrations/   # migrations do drizzle-kit
├── lib/
│   └── queries.ts     # queries/operations do banco
```

### 5.3 Configuração `.env`

```
DATABASE_URL=postgresql://devroast:devroast@localhost:5432/devroast
```

---

## 6. To-Dos de Implementação

- [x] **T1**: Criar `docker-compose.yml` com PostgreSQL
- [x] **T2**: Instalar dependências Drizzle
- [x] **T3**: Configurar `drizzle.config.ts`
- [x] **T4**: Criar schema com tabela `submissions`
- [x] **T5**: Criar arquivo de conexão `db/index.ts`
- [x] **T6**: Gerar migration inicial (execute `npm run db:push`)
- [x] **T7**: Criar Server Action para submeter código
- [x] **T8**: Criar Server Action para listar leaderboard
- [ ] **T9**: Atualizar page.tsx para usar dados do banco
- [ ] **T10**: Testar integração completa

---

## 7. Server Actions

### `submitCode(code: string, language: string, isRoastMode: boolean)`

1. Recebe código, linguagem detectada e modo roast
2. Gera roast (mock ou integração futura)
3. Salva no banco com score e roast_text
4. Retorna resultado

### `getLeaderboard(limit: number = 10)`

1. Query no banco ordenando por score ASC
2. Retorna top N entries do shame leaderboard
3. Paginação opcional para view completa

---

## 8. Notas

- O roast inicial pode ser mock (gerar texto aleatório + score aleatório)
- Autenticação não é necessária - leaderboard anônimo
- Não há necessidade de atualizar/submeter código - apenas insert
- Limite de 100 linhas aplicar no frontend antes de enviar