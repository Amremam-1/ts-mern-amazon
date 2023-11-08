import { Col, Row } from "react-bootstrap"

interface props {
  step1?: boolean
  step2?: boolean
  step3?: boolean
  step4?: boolean
}

const CheckoutSteps = ({ step1, step2, step3, step4 }: props) => {
  return (
    <Row className="checkout-steps mb-5">
      <Col className={step1 ? "active" : ""}>Sign-In</Col>
      <Col className={step2 ? "active" : ""}>Shipping</Col>
      <Col className={step3 ? "active" : ""}>Payment</Col>
      <Col className={step4 ? "active" : ""}>Place Order</Col>
    </Row>
  )
}

export default CheckoutSteps
