import axios from "axios";

const instance = axios.create({
  baseURL: "https://todo-c7ab8.firebaseio.com/"
});

export default instance;
