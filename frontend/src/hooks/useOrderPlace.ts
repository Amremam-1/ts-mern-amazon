import { useMutation } from "@tanstack/react-query"
import { CartItem, ShippingAddress } from "../types/Cart"
import apiClient from "../services/apiClientTwo"
import { Order } from "../types/Order"

const useOrderPlace = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: CartItem[]
      shippingAddress: ShippingAddress
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  })
export default useOrderPlace
