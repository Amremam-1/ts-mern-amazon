import { useQuery } from "@tanstack/react-query"
import APIClient from "../services/apiClient"
import { Product } from "../types/product"

const useProductPage = (slug: string) => {
  const apiClient = new APIClient<Product>(`api/products/${slug}`)
  return useQuery({
    queryKey: ["products", slug],
    queryFn: apiClient.getAll,
  })
}

export default useProductPage
