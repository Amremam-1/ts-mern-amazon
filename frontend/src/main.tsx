import React from "react"

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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { StoreProvider } from "./Store.tsx"
import CartPage from "./pages/CartPage.tsx"
import { SignInPage } from "./pages/SignInPage.tsx"
import SignUpPage from "./pages/SignUpPage.tsx"
import ShippingAddressPage from "./pages/ShippingAddressPage.tsx"
import PaymentMethodPage from "./pages/PaymentMethodPage.tsx"
import ProtectedRoute from "./components/ProtectedRoute.tsx"
import PlaceOrderPage from "./pages/PlaceOrderPage.tsx"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<HomePage />} />
      <Route path="product/:slug" element={<ProductPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="" element={<ProtectedRoute />}>
        <Route path="shipping" element={<ShippingAddressPage />} />
        <Route path="paymentMethod" element={<PaymentMethodPage />} />
        <Route path="placeorder" element={<PlaceOrderPage />} />
      </Route>
    </Route>
  )
)

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
)
