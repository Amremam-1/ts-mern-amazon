import { useQuery } from "@tanstack/react-query"
import APIClient from "../services/apiClient"
import { Product } from "../types/product"
import ms from "ms"

const apiClient = new APIClient<Product[]>("api/products")

const useProduct = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: apiClient.get,
    staleTime: ms("24h"),
  })

export default useProduct
