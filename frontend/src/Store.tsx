import React from "react"
import { Cart, CartItem } from "./types/Cart"
import { UserInfo } from "./types/UserInfo"

type AppState = {
  mode: string
  cart: Cart
  userInfo: UserInfo
}

const initialState: AppState = {
  userInfo: localStorage.getItem("useInfo")
    ? JSON.parse(localStorage.getItem("useInfo")!)
    : null,

  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")!
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme : dark)").matches
    ? "dark"
    : "light",

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "Paypal",
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
}

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "CART_ADD_ITEM"; payload: CartItem }
  | { type: "CART_REMOVE_ITEM"; payload: CartItem }
  | { type: "USER_SINGIN"; payload: UserInfo }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SWITCH_MODE": {
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" }
    }

    case "CART_ADD_ITEM": {
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item: CartItem) => newItem.slug === item.slug
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item: CartItem) =>
            item.slug === existItem.slug ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item.slug !== action.payload.slug
      )
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }

    case "USER_SINGIN": {
      return { ...state, userInfo: action.payload }
    }
    default:
      return state
  }
}

const defaultDispatch: React.Dispatch<Action> = () => initialState

const Store = React.createContext({
  state: initialState,
  dispatch: defaultDispatch,
})

function StoreProvider(props: React.PropsWithChildren) {
  const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
    reducer,
    initialState
  )
  return <Store.Provider value={{ state, dispatch }} {...props} />
}

export { Store, StoreProvider }
