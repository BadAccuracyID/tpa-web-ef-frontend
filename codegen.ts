import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "/Users/efrannathanael/Documents/23-1/01. TPA/03. Web TPA/02. TPA/tpa-web-ef/internal/graph/graphql",
  // documents: "src/**/*.tsx",
  generates: {
    "src/lib/gql/": {
      preset: "client",
      plugins: []
    }
  }
};

export default config;
