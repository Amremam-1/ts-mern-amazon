import { useMutation } from "@tanstack/react-query"
import APIClient from "../services/apiClient"
import { UserInfo } from "../types/UserInfo"

const apiClient = new APIClient<UserInfo>(`api/users/signup`)
const useSignUp = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) => await apiClient.post(email, password, name),
  })
}

export default useSignUp
