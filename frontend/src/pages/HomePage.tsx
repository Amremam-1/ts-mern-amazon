import { Row, Col } from "react-bootstrap"
import { useEffect, useReducer } from "react"
import axios from "axios"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import LoadingBox from "../components/LoadingBox"
import MessageBox from "../components/MessageBox"
import reducer, { initialState } from "../reducers/ProductReducer"
import ProductItem from "../components/ProductItem"

export default function HomePage() {
  const [{ loading, error, products }, dispatch] = useReducer(
    reducer,
    initialState
  )
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" })
      try {
        const result = await axios.get("/api/products")
        dispatch({ type: "FETCH_SUCCESS", payload: result.data })
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) })
      }
    }
    fetchData()
  }, [])

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      {products.map((product) => (
        <Col key={product.slug} sm={6} md={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
