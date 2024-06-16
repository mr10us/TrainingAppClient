import { $authHost } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getTypes = async (pageParam, query, signal) => {
  const queryParams = query
    ? `?page=${pageParam}&${query}`
    : `?page=${pageParam}`;

  const response = await $authHost.get(`/api/type/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getType = async (signal, typeID) => {
  const response = await $authHost.get(`/api/type/${typeID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createType = async (signal, name) => {
  const response = await $authHost.post(`/api/type/`, { signal, name });

  handleErrors(response);

  return response.data;
};

export const editType = async (signal, typeID, name) => {
  const response = await $authHost.put(`/api/type/${typeID}`, {
    signal,
    name,
  });

  handleErrors(response);

  return response.data;
};

export const deleteType = async (signal, typeID) => {
  const response = await $authHost.delete(`/api/type/${typeID}`, { signal });

  handleErrors(response);

  return response.data;
};
