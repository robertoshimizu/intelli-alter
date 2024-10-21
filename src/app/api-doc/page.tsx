import ReactSwagger from './react-swagger'
export default async function ApiDocPage() {
  // Working making the swagger.json file manually
  // the library is not working as expected
  return (
    <section className="container">
      <ReactSwagger url="/swagger.json" />
    </section>
  )
}
