import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3001", // por ahora fijo
});

export default instance;