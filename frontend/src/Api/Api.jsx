import axios from "axios"
import Cookies from "universal-cookie"

const baseURL = "http://localhost:5000/api"
export const Axios = axios.create({baseURL})

const cookie = new Cookies();
const token = cookie.get("auth");

export const AxiosToken = axios.create({baseURL,
    headers:{
        "Authorization":`Bearer ${token}`
    }
})