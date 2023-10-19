import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import { HelmetProvider } from "react-helmet-async"
import "./index.css"
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import HomePage from "./pages/HomePage.tsx"
import ProductPage from "./pages/ProductPage.tsx"
import axios from "axios"

axios.defaults.baseURL =
  process.env.NODE_ENV === "development" ? "http://localhost:4000" : "/"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
)
