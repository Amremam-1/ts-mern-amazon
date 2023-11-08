import { Row, Col } from "react-bootstrap"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import ProductItem from "../components/ProductItem"
import { Helmet } from "react-helmet-async"
import useProduct from "../hooks/useProduct"

export default function HomePage() {
  const { data: product, isLoading, error } = useProduct()
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>Amazon</title>
      </Helmet>
      {product!.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
