import { SERVER_URL } from "@/config.keys";
import Axios from "axios";

const backend = Axios.create({
  baseURL: SERVER_URL,
});

export default backend;
