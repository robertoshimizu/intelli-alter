'use client'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

interface ReactSwaggerProps {
  spec: Record<string, any>
}

export default function ReactSwagger({ spec }: ReactSwaggerProps) {
  return <SwaggerUI spec={spec} />
}
