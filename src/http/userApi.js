import { handleErrors } from "@utils/handlers/http";
import { $authHost } from "./index";

export const getUsers = async (signal, query) => {
  const response = await $authHost.get(
    "/api/user/" + ((query !== undefined && "?" + query) || ""),
    { signal }
  );
  handleErrors(response);

  return response.data;
};

export const getUser = async (signal, userID) => {
  const response = await $authHost.get(`/api/user/${userID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const login = async (signal, chatID, password) => {
  const response = await $authHost.post(`/api/user/login/`, { signal, chatID, password });

  handleErrors(response);

  if (response.status === 200) {
    localStorage.setItem("token", "Token " + response.data.token);
    localStorage.setItem("role", response.data.user.role);
    localStorage.setItem("userID", response.data.user.id);
  }

  return response;
};
