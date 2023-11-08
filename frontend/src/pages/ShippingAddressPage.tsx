import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Store } from "../Store"
import { Button, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import CheckoutSteps from "../components/CheckoutSteps"

const ShippingAddressPage = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(Store)
  const {
    cart: { shippingAddress },
  } = state

  const [fullName, setFullName] = useState(shippingAddress.fullName || "")
  const [address, setAddress] = useState(shippingAddress.address || "")
  const [city, setCity] = useState(shippingAddress.city || "")
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "")
  const [country, setCountry] = useState(shippingAddress.country || "")

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        fullName,
        address,
        city,
        postalCode,
        country,
      },
    })
    localStorage.setItem(
      "shippingAddress",
      JSON.stringify({ fullName, address, city, postalCode, country })
    )
    navigate("/paymentMethod")
  }
  return (
    <div>
      <Helmet>
        <title>Shipping Address</title>
      </Helmet>
      <CheckoutSteps step1 step2></CheckoutSteps>

      <div className="container small-container">
        <h1>Shipping Address</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="fullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              value={fullName}
              required
              onChange={(e) => setFullName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postalCode">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ShippingAddressPage
