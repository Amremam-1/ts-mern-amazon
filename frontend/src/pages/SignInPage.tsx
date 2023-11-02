import { useState, useContext, useEffect } from "react"
import { Button, Container, Form, FormGroup } from "react-bootstrap"
import { Helmet } from "react-helmet-async"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import useSignIn from "../hooks/UseSignIn"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import { toast } from "react-toastify"
import LoadingBox from "../components/LoadingBox"

export const SignInPage = () => {
  const navigate = useNavigate()

  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get("redircet")
  const redirect = redirectInUrl ? redirectInUrl : "/"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isLoading } = useSignIn()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await signin({
        email,
        password,
      })
      dispatch({ type: "USER_SINGIN", payload: data })
      localStorage.setItem("userInfo", JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])
  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>

        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Sign In
          </Button>
          {isLoading && <LoadingBox />}
        </div>

        <div className="mb-3">
          New Customer?{" "}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}
