import axios from "axios";

const $host = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const $adminHost = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const authInterceptor = (config) => {
  config.headers.authorization = `Token ${localStorage.getItem("key")}`;
  return config;
};

$adminHost.interceptors.request.use(authInterceptor);
$adminHost.interceptors.response.use(
  (response) => {
    return response;
  },
);

export { $host, $adminHost };
