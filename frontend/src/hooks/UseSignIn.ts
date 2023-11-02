import { useMutation } from "@tanstack/react-query"
import APIClient from "../services/apiClient"
import { UserInfo } from "../types/UserInfo"

const apiClient = new APIClient<UserInfo>("/api/users/signin")
const useSignIn = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) => await apiClient.post(email, password),
  })
}

export default useSignIn
