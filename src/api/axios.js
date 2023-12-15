import axios from "axios";

export default axios.create({
  baseURL: "http://backend.celyasa.com:5001",
  // withCredentials: true,
  // headers: { "Content-Type": "application/json" },
  //   headers: {
  //     Authorization: "Bearer 4V24V1R-5jwE-8BZ4HXyHQ",
  //   },
  //   params: {
  //     term: "food",
  //     location: "San Francisco",
  //   },
});

// http://localhost:5000/api/cmovilv3/usuario/login/web
