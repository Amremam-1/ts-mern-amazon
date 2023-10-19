import { Product } from "../types/product"

type State = {
  products: Product[]
  loading: boolean
  error: string
}

type Action =
  | { type: "FETCH_REQUEST" }
  | {
      type: "FETCH_SUCCESS"
      payload: Product[]
    }
  | { type: "FETCH_FAIL"; payload: string }

export const initialState: State = {
  products: [],
  loading: true,
  error: "",
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true }

    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false }

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default reducer
