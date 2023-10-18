import { Row, Col } from "react-bootstrap"
import { sampleProducts } from "../data"
import { Link } from "react-router-dom"

export default function HomePage() {
  return (
    <Row className="mt-3">
      {sampleProducts.map((product) => (
        <Col key={product.slug} ms={6} md={4} lg={3}>
          <Link to={"/product/" + product.slug}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
