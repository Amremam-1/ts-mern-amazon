import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Store } from "../Store"
import CheckoutSteps from "../components/CheckoutSteps"
import { Helmet } from "react-helmet-async"
import { Button, Form } from "react-bootstrap"

const PaymentMethodPage = () => {
  const navigate = useNavigate()

  const { state, dispatch } = useContext(Store)
  const {
    cart: { shippingAddress, paymentMethod },
  } = state

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "paypal"
  )

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping")
    }
  }, [shippingAddress, navigate])

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName })
    localStorage.setItem("PaymentMethod", paymentMethodName)
    navigate("/placeorder")
  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <div className="container small-container">
        <Helmet>
          <title>Payment Method</title>
        </Helmet>
        <h1 className="mb-3">Payment Method</h1>
        <Form onSubmit={submitHandler}>
          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Paypal"
              label="Paypal"
              value="Paypal"
              checked={paymentMethodName === "Paypal"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Fawry"
              label="Fawry"
              value="Fawry"
              checked={paymentMethodName === "Fawry"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Form.Check
              type="radio"
              id="Meeza"
              label="Meeza"
              value="Meeza"
              checked={paymentMethodName === "Meeza"}
              onChange={(e) => setPaymentMethodName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <Button type="submit">Continue</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default PaymentMethodPage
