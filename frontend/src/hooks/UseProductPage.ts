import { useQuery } from "@tanstack/react-query"
import APIClient from "../services/apiClient"
import { Product } from "../types/product"
import ms from "ms"

const useProductPage = (slug: string) => {
  const apiClient = new APIClient<Product>(`api/products/${slug}`)
  return useQuery({
    queryKey: ["products", slug],
    queryFn: apiClient.getAll,
    staleTime: ms("24h"),
  })
}

export default useProductPage
