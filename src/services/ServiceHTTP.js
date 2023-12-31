import axios from "axios";

const ServiceHTTP = axios.create({
  timeout: 1000,
});

ServiceHTTP.interceptors.request.use(
  (config) => {
    document.body.classList.add("loading-indicator");
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ServiceHTTP.interceptors.response.use(
  (config) => {
    document.body.classList.remove("loading-indicator");
    return config;
  },
  (error) => {
    document.body.classList.remove("loading-indicator");
    if (error.response.status === 401) {
      window.location.href = "/";
    }

    if (error.response.status === 400 || error.response.status === 404) {
      if (error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.response.data instanceof Blob) {
        alert(error.message);
      } else {
        alert("Something when wrong! Please contact developer.");
      }
    }
    return Promise.reject(error);
  }
);

export default ServiceHTTP;
