import axios from "axios"

export const apiFront = axios.create({
  baseURL: '/api'
})
