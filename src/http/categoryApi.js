import { $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getCategories = async (signal, query) => {
  const queryParams = query ? "?" + query : null;
  const response = await $host.get(`/api/category/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getCategory = async (signal, categoryID) => {
  const response = await $host.get(`/api/category/${categoryID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createCategory = async (signal, name) => {
  const response = await $host.post(`/api/category/`, { signal, name });

  handleErrors(response);

  return response.data;
};

export const editCategory = async (signal, categoryID, name) => {
  const response = await $host.patch(`/api/category/${categoryID}`, { signal, name });

  handleErrors(response);

  return response.data;
};
