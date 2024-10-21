'use server'
import { createSwaggerSpec } from 'next-swagger-doc'

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api',
    url: 'https://www.api.solvegraph.com',
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'API IntelliDoctor.ai',
        description: 'Documentação dos endpoints da API IntelliDoctor.ai',
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

  // Log the generated spec
  console.log('\nGenerated Swagger Spec: ', spec)

  // Check if spec is undefined or null and return a default value if needed
  if (!spec || typeof spec !== 'object') {
    console.error('Swagger spec is invalid or not properly generated.')
    return null // or return a default mock object
  }
  return spec
}
