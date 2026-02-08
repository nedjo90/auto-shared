# @auto/shared

Shared types, constants, and Zod validators for the Auto platform.

Consumed by `auto-backend` and `auto-frontend`.

## Setup

```bash
npm install
npm run build
```

## Publishing to Azure Artifacts

### Prerequisites

1. Create an Azure DevOps organization and project
2. Create a feed in Azure Artifacts (e.g., `auto-packages`)
3. Generate a Personal Access Token (PAT) with **Packaging (Read & Write)** scope

### Configure .npmrc

Uncomment and fill in the `.npmrc` file at the repo root:

```ini
@auto:registry=https://pkgs.dev.azure.com/<ORG>/_packaging/<FEED>/npm/registry/
//pkgs.dev.azure.com/<ORG>/_packaging/<FEED>/npm/registry/:_authToken=<YOUR_PAT>
//pkgs.dev.azure.com/<ORG>/_packaging/<FEED>/npm/:_authToken=<YOUR_PAT>
```

Replace `<ORG>`, `<FEED>`, and `<YOUR_PAT>` with your values.

### Publish

```bash
npm run build
npm publish
```

### Consumer Setup (auto-backend, auto-frontend)

In each consuming repo, configure `.npmrc` with the same registry line:

```ini
@auto:registry=https://pkgs.dev.azure.com/<ORG>/_packaging/<FEED>/npm/registry/
```

Then update `package.json` to use the published version instead of `file:`:

```json
"@auto/shared": "^0.1.0"
```

### CI/CD

The `azure-pipelines.yml` includes a commented-out publish step. Uncomment it after configuring the feed. Backend and frontend pipelines include a commented-out `npmAuthenticate` task for the same purpose.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Type-check without emitting |
| `npm run test` | Run Vitest |
| `npm run format` | Format with Prettier |
