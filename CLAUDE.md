# Coding rules (all repos: colour-balloon-dashboard, colour-balloon-fe, colour-balloon-be)

These rules come from the project owner and apply to every file Claude writes or edits.

## 1. File size: max 300 lines
- No source file may exceed **300 lines**. If a file is getting close, split it before adding more.
- Split by responsibility: page → feature components → small UI pieces; hooks, schemas, types and helpers each in their own file.
- One React component per file (tiny private helpers used only by that component may stay with it).
- Exception: generated or vendored files (shadcn `src/components/ui/*`, Prisma migrations, generated API types). Don't hand-edit them to meet the limit; regenerating would undo it.

## 2. Components first
- Break UI into focused components. A page file only composes components; it holds no large JSX blocks or business logic.
- A component that grows several unrelated sections → extract each section into its own component.

## 3. Don't repeat yourself
- Before writing anything, search the codebase for an existing component, hook, util, type or constant and reuse it.
- When the same logic or markup appears a second time, extract it into a shared place instead of copying it:
  - shared UI → `src/components/`
  - shared hooks → `src/hooks/`
  - shared helpers → `src/lib/`
  - shared types → `src/types/`
- Never copy-paste a block and tweak it; parameterise it with props or arguments.

## 4. No hardcoding
- No magic numbers or strings inline. Put them in named constants (`src/constants/` or the feature's `constants.ts`).
- No hardcoded URLs, ports or secrets: use env vars and config (`.env`, `next.config.ts`, NestJS `ConfigService`).
- No hardcoded colours, font sizes or spacing values: use the Tailwind theme tokens in `globals.css` (`bg-primary`, `text-muted-foreground`…), never raw hex/oklch in components.
- Lists that drive UI (nav items, options, statuses, table columns) live in config arrays, not repeated JSX.
- Enums and status values come from one typed source shared with the API types.

## 5. Reusability
- Build components to be reused: data comes in through typed props, not fetched or hardcoded inside generic UI components.
- Keep shared UI (`components/ui`, `components/common`, `components/layout`) free of domain logic; domain UI lives in `components/<domain>/`.

## 6. Architecture: layers, not feature folders
No `src/features/` folder. Code is organised by layer; each layer has **one flat file per domain** (no per-domain subfolders except under `components/`).

```
src/
  app/                    routes only: thin pages that compose components
  components/
    ui/                   shadcn (generated, don't hand-edit)
    layout/               sidebar, header
    common/               shared domain-free UI: DataTable, EmptyState, ConfirmDialog…
    <domain>/             domain UI, e.g. modules/module-table.tsx, auth/login-form.tsx
  services/<domain>.service.ts   API calls: plain async functions returning typed data
  hooks/use-<domain>.ts          query keys + useQuery/useMutation hooks
  schemas/<domain>.schema.ts     zod form schemas (+ z.infer types)
  types/<domain>.types.ts        API/data types; shared ones in types/api.types.ts
  constants/                     named constants
  lib/  config/  providers/
```

Flow: **component → hook → service → `lib/axios`**.

| Layer | May import | Must not import |
|---|---|---|
| `components/` | hooks, schemas, types, constants, other components | services, `lib/axios` |
| `hooks/` | services, types | `lib/axios` |
| `services/` | `lib/axios`, types | React, hooks |
| `schemas/`, `types/`, `constants/` | each other only | anything with side effects |

- Only `services/` imports `lib/axios`.
- Every hook file exports a `<domain>Keys` object; every key starts with `<domain>Keys.all`, and every mutation invalidates `<domain>Keys.all`.
- Server data lives only in React Query. Never copy it into `useState` or a store. Filters and pagination live in the URL (`useSearchParams`).
- Split a layer file only when it nears 300 lines (e.g. `services/module.service.ts` → `services/module/…`).

## 7. 100% TypeScript
- Every file is `.ts` / `.tsx`. No `.js`/`.jsx` source files.
- No `any` (ESLint enforces it). Use proper types, generics or `unknown` with narrowing.
- Type all props, function parameters, return values of exported functions, and API responses.
- Derive types instead of duplicating them (`z.infer`, `typeof`, `Pick`/`Omit`, generated API types).

## 8. Before finishing any change
- `npx tsc --noEmit` and `npm run lint` pass.
- Re-check rule 1: no file over 300 lines.
