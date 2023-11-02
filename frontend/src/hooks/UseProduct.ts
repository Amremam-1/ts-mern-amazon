import { useQuery } from "@tanstack/react-query"
import APIClient from "../services/apiClient"
import { Product } from "../types/product"

const apiClient = new APIClient<Product[]>("api/products")

const useProduct = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: apiClient.get,
  })

export default useProduct
