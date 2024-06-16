import { $authHost } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getCategories = async (pageParam, query, signal) => {
  const queryParams = query
    ? `?page=${pageParam}&${query}`
    : `?page=${pageParam}`;

  const response = await $authHost.get(`/api/category/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getCategory = async (signal, categoryID) => {
  const response = await $authHost.get(`/api/category/${categoryID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createCategory = async (signal, name) => {
  const response = await $authHost.post(`/api/category/`, { signal, name });

  handleErrors(response);

  return response.data;
};

export const editCategory = async (signal, categoryID, name) => {
  const response = await $authHost.put(`/api/category/${categoryID}`, { signal, name });

  handleErrors(response);

  return response.data;
};

export const deleteCategory = async (signal, categoryID) => {
  const response = await $authHost.delete(`/api/category/${categoryID}`, { signal });

  handleErrors(response);

  return response.data;
};
