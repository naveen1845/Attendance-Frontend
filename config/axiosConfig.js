import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.111.120:3000/api/v1",
    timeout: 5000
})