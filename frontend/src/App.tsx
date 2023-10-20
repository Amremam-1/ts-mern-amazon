import { Container, Nav, Navbar } from "react-bootstrap"
import { Outlet } from "react-router-dom"
import ColorModeSwitch from "./components/ColorModeSwitch"
function App() {
  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar variant="dark" bg="dark" expand="lg">
          <Container>
            <Navbar.Brand>Amazona</Navbar.Brand>
          </Container>
          <Nav className="d-flex align-items-center">
            <ColorModeSwitch />
            <a href="/cart" className="nav-link">
              Cart
            </a>
            <a href="/signin" className="nav-link">
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
