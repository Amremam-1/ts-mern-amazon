import { Button, Card, CardBody, CardText, CardTitle } from "react-bootstrap"
import { Product } from "../types/product"
import { Link } from "react-router-dom"
import Rating from "./Rating"

interface props {
  product: Product
}

const ProductItem = ({ product }: props) => {
  return (
    <Card>
      <Link to={"/product/" + product.slug}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <CardBody>
        <Link to={"/product/" + product.slug}>
          <CardTitle>{product.name}</CardTitle>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <CardText>${product.price}</CardText>

        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button>Add to cart</Button>
        )}
      </CardBody>
    </Card>
  )
}

export default ProductItem
