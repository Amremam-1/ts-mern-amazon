import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import { CartItem } from "../types/Cart"
import { toast } from "react-toastify"
import { Helmet } from "react-helmet-async"
import { Button, Card, CardBody, Col, ListGroup, Row } from "react-bootstrap"
import MessageBox from "../components/MessageBox"

const CartPage = () => {
  const navigate = useNavigate()
  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = (item: CartItem, quantity: number) => {
    if (item.countInStock < quantity) {
      toast.warn("Sorry. Product is out of stock")
      return
    }
    dispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    })
  }
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping")
  }

  const removeItemHandler = (item: CartItem) => {
    dispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    })
  }
  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems?.length === 0 ? (
            <MessageBox>
              Cart is empty.
              <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: CartItem) => (
                <ListGroup.Item key={item.slug}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded thumbnail"
                      ></img>{" "}
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </Col>

                    <Col md={3}>
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.quantity}</span>{" "}
                      <Button
                        variant={mode}
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>

                    <Col md={3}>${item.price}</Col>

                    <Col md={2}>
                      <Button
                        onClick={() => removeItemHandler(item)}
                        variant={mode}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <CardBody>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    total ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Link to="/shipping">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      className="full-width-button"
                      disabled={cartItems?.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default CartPage
