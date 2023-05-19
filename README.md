# Welcome to the NextJS Soccer Manager App!

This project uses the following:

- NextJS
- Auth0 (Authentication)
- GraphQL (API)
- GraphQL Yoga (GraphQL Client)
- Prisma (ORM)
- PostgresQL (Database)

## Getting Started

To get started locally, be sure you have a local Postgres DB running on your machine. I recommend following the steps here to get setup: [Postgres App](https://postgresapp.com/).

Next, clone this repo, and install dependencies with `yarn install`.

Then, create an `.env.local` file in the root directory and add the following ENV variables:

```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
POSTGRES_PRISMA_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?KEY1=VALUE&KEY2=VALUE&KEY3=VALUE"

AUTH0_SECRET="..." # Reach out to Mansoor S for this value
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_ISSUER_BASE_URL="..." # Reach out to Mansoor S for this value
AUTH0_CLIENT_ID="..." # Reach out to Mansoor S for this value
AUTH0_CLIENT_SECRET="..." # Reach out to Mansoor S for this value
AUTH0_HOOK_SECRET="..." # Reach out to Mansoor S for this value
```

## NextJS App Server

To spin up the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Navigate to [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) to view the GraphiQL playground.

## Prisma Studio Server

To run Prisma Studio against your local Postgres DB (note: you may need to install [dotenv-cli](https://www.npmjs.com/package/dotenv-cli)):

```bash
yarn prisma:studio:local
```

Open [http://localhost:5555](http://localhost:5555) to view Prisma Studio connected to your local Postgres DB

#### NOTES:

- This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
- This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
