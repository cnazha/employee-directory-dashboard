import type {CodegenConfig} from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: "https://employee-directory.nazha.dev/graphql",
  documents: ["src/graphql/**/*.graphql"],
  generates: {
    "src/gql/": {
      preset: "client",
      plugins: []
    },
    'src/gql/operations.ts': {
      plugins: [
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        withHooks: true,
      },
    }
  }
};

export default config;
