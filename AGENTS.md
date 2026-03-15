# devroast

## Stack
- Next.js 16, React 19, Tailwind CSS 4, TypeScript

## Estrutura
```
src/
├── app/           # Rotas Next.js
├── components/    # Componentes React
```

## Padrões

### Componentes UI
- Localização: `src/components/ui/`
- Padrão: composição com sub-componentes
- Usar `tailwind-variants` para variantes
- Props nativas estendidas com `HTMLAttributes`

### Estilização
- Classes Tailwind diretamente ou via `tailwind-variants`
- Usar `twMerge` apenas com interpolação de string
- Cores fixas: notação arbitrária `bg-[#22c55e]`

### Regras
1. Named exports apenas
2. Usar `forwardRef` + `displayName`
3. Props opcionais com defaults sensatos
