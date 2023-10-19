import axios from "axios"

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development" ? "http://localhost:4000/" : "/",
  headers: {
    "Content-type": "application/json",
  },
})

class APIClient<T> {
  endpoint: string

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  get = () => {
    return axiosInstance.get<T>(this.endpoint).then((res) => res.data)
  }
}

export default APIClient