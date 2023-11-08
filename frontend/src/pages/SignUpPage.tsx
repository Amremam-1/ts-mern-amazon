import { useContext, useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Store } from "../Store"
import useSignUp from "../hooks/UseSignUp"
import { toast } from "react-toastify"
import { getError } from "../utils"
import { ApiError } from "../types/ApiError"
import { Button, Container, Form } from "react-bootstrap"
import { Helmet } from "react-helmet-async"

const SignUpPage = () => {
  const navigate = useNavigate()

  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get("redirect")
  const redirect = redirectInUrl ? redirectInUrl : "/"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const { mutateAsync: signup, isLoading } = useSignUp()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Password do not match")
      return
    }
    try {
      const data = await signup({
        name,
        password,
        email,
      })
      dispatch({ type: "USER_SINGIN", payload: data })
      localStorage.setItem("userInfo", JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>ConfirmPassword</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit" disabled={isLoading}>
            Sign Up
          </Button>
        </div>

        <div className="mb-3">
          Already have an account?{" "}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  )
}

export default SignUpPage
