## Installation

### Start the docker

Go to ./apps/graphql-user-auth and run

```bash
docker compose -f docker-compose.dbs.yml up
```

### Install Dependencies

```bash
$ pnpm --filter graphql-user-auth install && pnpm --filter vite-react-user-auth install && pnpm --filter ui-kit  install
```

### Start BE

```bash
pnpm --filter graphql-user-auth run start:debug
```

### Build ui-kit

```bash
pnpm --filter ui-kit run build-ui
```

### Start FE

```bash
pnpm --filter vite-react-user-auth run dev
```
