# Padrões de Componentes UI

## Estrutura

- Localização: `src/components/ui/`
- Cada componente em arquivo individual: `nome-do-componente.tsx`
- Named exports apenas (nunca default exports)

## Composição de Componentes

Quando um componente tem sub-componentes, exportar todos no mesmo arquivo e no arquivo do componente pai:

```tsx
// code-block.tsx
import { CodeBlockHeader } from "./code-block-header";

export { CodeBlockHeader }; // Re-export para composição

export async function CodeBlock({ ... }) {
  // implementação
}
```

### Padrão de Sub-componentes

Componentes que seguem o padrão de composição:
- `Card` → `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`
- `CodeBlock` → `CodeBlockHeader`

## Tailwind Variants

Usar `tailwind-variants` para criar variantes de componentes:

```tsx
import { tv, type VariantProps } from "tailwind-variants";

const componentVariants = tv({
  base: "classes base sempre aplicadas",
  variants: {
    variant: {
      default: "classes para variante default",
      secondary: "classes para variante secondary",
    },
    size: {
      sm: "classes para tamanho small",
      md: "classes para tamanho medium",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});
```

## Props

Estender props nativas do HTML:

```tsx
import { type HTMLAttributes, forwardRef } from "react";
import { type VariantProps } from "tailwind-variants";

type ComponenteProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof componentVariants>;
```

## Exemplo Completo

```tsx
import { type HTMLAttributes, forwardRef } from "react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center...",
  variants: {
    variant: { ... },
    size: { ... },
  },
  defaultVariants: { ... },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
```

## Regras

1. Usar `forwardRef` para permitir ref forwarding
2. Definir `displayName` após o componente
3. Usar `twMerge` para mesclar classes Tailwind quando usar interpolação de string com className: `className={twMerge("classe-base", className)}`
4. Não usar `twMerge` com `tailwind-variants` - passar `className` diretamente para `variants()`
5. Manter componentes pequenos e reutilizáveis
6. Cores e valores fixed usar notação arbitrária: `bg-[#22c55e]`

## Componentes Disponíveis

| Componente | Descrição |
|------------|-----------|
| `Button` | Botão com variantes |
| `Badge` | Badge/label |
| `Card` | Card com sub-componentes |
| `CodeBlock` | Bloco de código com syntax highlighting |
| `CodeBlockHeader` | Header para CodeBlock |
| `CodeEditor` | Editor de código (Client) |
| `ScoreRing` | Anel de score visual |
| `TableRow` | Linha de tabela |
| `TableCell` | Célula de tabela |
| `TableRankCell` | Célula de rank |
| `TableScoreCell` | Célula de score |
| `TableCodeCell` | Célula de código |
| `TableLangCell` | Célula de linguagem |
| `Toggle` | Toggle switch |

## Componentes de Feature (src/components/)

Além dos componentes UI genéricos, existem componentes de feature em `src/components/`:

| Componente | Localização | Descrição |
|------------|------------|-----------|
| `CodeSubmit` | `code-submit.tsx` | Form de submissão de código (Client) |
| `CodePreview` | `code-preview.tsx` | Preview expansível com HTML pré-renderizado |
| `MetricsCards` | `ui/metrics-cards.tsx` | Cards de métricas (tRPC) |
| `LeaderboardSection` | `leaderboard/` | Seção do leaderboard (Server) |
| `LeaderboardSkeleton` | `leaderboard/` | Skeleton para loading |

### CodePreview (Client Component)

Recebe HTML pré-renderizado (via `dangerouslySetInnerHTML`) e gerencia estado de expand/collapse:

```tsx
"use client";

// Props: html (string), lineCount (number), needsExpansion (boolean)
// Server Component (pai) renderiza o HTML com Shiki e passa para CodePreview
```

**Padrão de uso:**
1. Server Component busca dados e renderiza HTML com `codeToHtml` (Shiki)
2. Passa HTML para `CodePreview` (Client Component)
3. `CodePreview` gerencia estado de expand/collapse

## Server Components

Componentes que usam async/await devem ser Server Components:

```tsx
// Server Component (async)
export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await codeToHtml(code, { lang: language, theme: "vesper" });
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

## Slots/Children Pattern

Para componentes que aceitam conteúdo children:

```tsx
export const CardContent = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return <div ref={ref} {...props} />;
});
```

Uso:
```tsx
<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo</CardContent>
</Card>
```

## Expand/Collapse com Animação

Padrão para componentes que precisam de estado de expand/collapse (ex: `CodePreview`):

**Importante:** Evitar criar componentes Client apenas para exibir HTML. Separar responsabilidades:
- **Server Component**: Renderiza HTML (ex: com Shiki) e passa para Client Component
- **Client Component**: Gerencia estado de UI (expand/collapse) e exibe HTML via `dangerouslySetInnerHTML`

```tsx
// 1. Server Component - renderiza HTML e passa para cliente
export async function MyServerComponent() {
  const html = await codeToHtml(code, { lang: "javascript" });
  return <CodePreview html={html} needsExpansion={true} lineCount={10} />;
}

// 2. Client Component - recebe HTML e gerencia estado
"use client";
export function CodePreview({ html, needsExpansion, lineCount }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className={`transition-all ${isExpanded ? "max-h-[1000px]" : "max-h-[72px]"}`}>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      {needsExpansion && (
        <button onClick={() => setIsExpanded(!isExpanded)}>
          <ChevronDown className={isExpanded ? "rotate-180" : ""} />
          {isExpanded ? "$ collapse" : "$ expand"}
        </button>
      )}
    </div>
  );
}
```

**Pontos importantes:**
- Usar `overflow-hidden` + `max-h` dinâmico para animação
- `transition-all duration-300 ease-in-out` para transição suave
- Rotação do ícone com `rotate-180`
- Lucide icons para ícones consistentes
