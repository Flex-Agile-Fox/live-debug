import axios from "axios";

const footballAPI = axios.create({
  baseURL: "http://localhost:3000"
});

export default footballAPI;
