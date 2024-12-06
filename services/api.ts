import axios from "axios";

export const routeUsers = () =>
  axios.get("https://jsonplaceholder.typicode.com/users");
