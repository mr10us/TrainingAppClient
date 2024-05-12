import { handleErrors } from "@utils/handlers/http";
import { $host } from "./index";

export const getUsers = async (query) => {
  const response = await $host.get(
    "/api/user/" + ((query !== undefined && "?" + query) || "")
  );
  handleErrors(response);

  return response.data;
};

export const getUser = async (userID) => {
  const response = await $host.get(`/api/user/${userID}/`);

  handleErrors(response);

  return response.data;
};

export const login = async (chatID) => {
  const response = await $host.post(`/api/user/login/`, { chatID });

  handleErrors(response);

  return response.data;
};
