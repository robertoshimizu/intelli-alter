import { createSwaggerSpec } from 'next-swagger-doc'

import 'server-only'

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    url: 'https://www.consiliis.tech',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Next Swagger API Example',
        description: 'API documentation for Next.js API routes',
        version: '1.0.0'
      }
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: []
  })
  return spec
}
