'use client'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

interface ReactSwaggerProps {
  url: string | undefined
}

export default function ReactSwagger({ url }: ReactSwaggerProps) {
  return <SwaggerUI url={url} />
}
