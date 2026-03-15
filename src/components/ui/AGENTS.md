# Padrões de Componentes UI

## Estrutura

- Localização: `src/components/ui/`
- Cada componente em arquivo individual: `nome-do-componente.tsx`
- Named exports apenas (nunca default exports)

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
import { type HTMLAttributes } from "react";
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
