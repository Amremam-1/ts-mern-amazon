import { Helmet } from "react-helmet-async"
import useProductPage from "../hooks/useProductPage"
import { useNavigate, useParams } from "react-router-dom"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import { convertProductToCartItem, getError } from "../utils"
import { ApiError } from "../types/ApiError"
import {
  Badge,
  Button,
  Card,
  CardBody,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap"
import Rating from "../components/Rating"
import { Store } from "../Store"
import { useContext } from "react"
import { toast } from "react-toastify"

export default function ProductPage() {
  const params = useParams()
  const { slug } = params
  const { data: product, isLoading, error } = useProductPage(slug!)

  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const navigate = useNavigate()
  const addToCartHandler = () => {
    const existItem = cart.cartItems.find((x) => x.slug === product!.slug)
    const quantity = existItem ? existItem.quantity + 1 : 1

    if (product!.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock")
      return
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...convertProductToCartItem(product!), quantity },
    })
    navigate("/cart")
  }
  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name} />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h2>{product.name}</h2>
            </ListGroupItem>

            <ListGroupItem>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroupItem>

            <ListGroupItem> Price : ${product.price}</ListGroupItem>
            <ListGroupItem>
              Description:
              <p>{product.description}</p>
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroupItem>
                  <Row>
                    <Col>Price</Col>
                    <Col>${product.price}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroupItem>

                {product.countInStock > 0 && (
                  <ListGroupItem>
                    <div className="d-grid">
                      <Button onClick={addToCartHandler} variant="primary">
                        Add to cart
                      </Button>
                    </div>
                  </ListGroupItem>
                )}
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
