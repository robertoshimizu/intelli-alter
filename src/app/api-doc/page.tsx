import { getApiDocs } from '../../../lib/swagger'
import ReactSwagger from './react-swagger'
export default async function ApiDocPage() {
  const spec = await getApiDocs()
  return (
    <section className="container">
      <ReactSwagger spec={spec} url="/swagger.json" />
    </section>
  )
}
