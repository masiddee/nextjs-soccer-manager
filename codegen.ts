
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  generates: {
    "./graphql/generated-types.ts": {
      plugins: [
        "typescript",
        "typescript-operations"
      ]
    }
  }
};

export default config;
