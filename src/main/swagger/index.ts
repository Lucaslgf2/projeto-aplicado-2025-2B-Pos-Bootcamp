import components from './components'
import { generateSwaggerServerUrl } from './helpers'
import paths from './paths'

export default {
  openapi: '3.0.3',
  info: {
    title: 'LGF - Gestão Condominios - Backend',
    description: 'Documentação da API Backend.',
    version: '1.0.0'
  },
  externalDocs: {
    description: 'any_description',
    url: 'any_url'
  },
  servers: [generateSwaggerServerUrl()],
  tags: [],
  paths,
  components: {
    ...components,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT'
      },
      xApiKey: {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key'
      }
    }
  }
}
