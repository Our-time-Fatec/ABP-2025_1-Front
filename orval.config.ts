import { defineConfig } from 'orval'

export default defineConfig({
  api: {
    input: 'http://localhost:3030/docs/json',

    output: {
      target: './src/http/api.ts',
      client: 'fetch',
      httpClient: 'fetch',
      clean: true,
      baseUrl: 'http://localhost:3030',

      override: {
        fetch: {
          includeHttpResponseReturnType: false,
        },

        mutator: {
          path: './src/client/http.ts',
          name: 'http',
        },
      },
    },
  },
})
