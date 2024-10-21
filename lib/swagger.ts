'use server'
import { createSwaggerSpec } from 'next-swagger-doc'
import path from 'path' // Required for resolving the folder path

export const getApiDocs = async () => {
  try {
    // Log the apiFolder path to ensure it is correct
    const apiFolderPath = path.resolve('src/app/api')
    console.log('Resolved API Folder Path:', apiFolderPath)

    // Generate the Swagger spec
    const spec: Record<string, any> = createSwaggerSpec({
      apiFolder: apiFolderPath, // Use resolved path for better debugging
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

    // Log the generated spec to check if it's valid
    console.log('\nGenerated Swagger Spec: ', spec)

    // Return the generated spec or a default mock object if it's invalid
    if (!spec || typeof spec !== 'object') {
      console.error('Swagger spec is invalid or not properly generated.')
      return null // or return a default mock object
    }

    return spec
  } catch (error) {
    console.error('Error generating Swagger spec:', error)
    return null // Fallback in case of an error
  }
}
