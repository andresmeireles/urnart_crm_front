import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://127.0.0.1:8000/graphql',
  documents: ['src/**/*.tsx', 'src/**/*.ts', 'src/**/**/*.ts', 'src/**/**/*.ts'],
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
