import { getApiDocs } from '../../../lib/swagger'
import ReactSwagger from './react-swagger'
export default async function ApiDocPage() {
  return (
    <section className="container">
      <ReactSwagger url="/swagger.json" />
    </section>
  )
}
