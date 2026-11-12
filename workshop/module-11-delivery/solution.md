# Solução de referência — (Delivery)

A automação de deploy já está pronta no repositório.

## Como funciona

O workflow [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml)
dispara após uma execução bem-sucedida do workflow `CI` na `main`, ou por
`workflow_dispatch`:

1. **Build do app** com `VITE_BASE=/${{ github.event.repository.name }}/app/` —
   garante que os assets apontem para o subcaminho correto do Pages.
2. **Montagem do `_site`:**
   - `docs/*` → raiz (site do workshop),
   - `dist/*` → `/app/` (app buildado),
   - `workshop/*` → `/workshop/` (markdown que o site renderiza).
3. **Verificação e publicação:** o workflow confirma que o `_site` contém o
   site, o app, o workshop e os bundles com o prefixo correto; depois publica
   via `actions/upload-pages-artifact` + `actions/deploy-pages`.

## O `base` configurável

Em [`vite.config.ts`](../../vite.config.ts):

```ts
base: process.env.VITE_BASE ?? '/',
```

- **Local/dev:** `base = '/'`.
- **Pages:** `base = '/<repo>/app/'` (injetado pelo workflow).

Sem isso, os assets seriam buscados na raiz do domínio e dariam 404.

## Validação local

```bash
VITE_BASE=/sdd-weather-app/app/ pnpm build
pnpm preview
```

## Configuração do repositório (uma vez)

- **Settings → Pages → Source: GitHub Actions.**
- Permissões declaradas por job: leitura do conteúdo e configuração do Pages no
   build; `pages: write` e `id-token: write` somente no deploy.

## URLs finais

- Workshop: `https://<user>.github.io/<repo>/`
- App: `https://<user>.github.io/<repo>/app/`

Ciclo SDD completo: **Brief → Spec → Plan → Tasks → Code → Test → Review →
Ship**. O Weather App está no ar.
