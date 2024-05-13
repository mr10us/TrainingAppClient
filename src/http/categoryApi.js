import { $adminHost, $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getCategories = async (pageParam, query, signal) => {
  const queryParams = query
    ? `?page=${pageParam}&${query}`
    : `?page=${pageParam}`;

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
  const response = await $adminHost.post(`/api/category/`, { signal, name });

  handleErrors(response);

  return response.data;
};

export const editCategory = async (signal, categoryID, name) => {
  const response = await $adminHost.put(`/api/category/${categoryID}`, { signal, name });

  handleErrors(response);

  return response.data;
};

export const deleteCategory = async (signal, categoryID) => {
  const response = await $adminHost.delete(`/api/category/${categoryID}`, { signal });

  handleErrors(response);

  return response.data;
};
