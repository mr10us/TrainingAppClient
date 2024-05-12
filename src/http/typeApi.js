import { $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getTypes = async (signal, query) => {
  const queryParams = query ? "?" + query : null;
  const response = await $host.get(`/api/type/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getType = async (signal, typeID) => {
  const response = await $host.get(`/api/type/${typeID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createType = async (signal, name) => {
  const response = await $host.post(`/api/type/`, { signal, name });

  handleErrors(response);

  return response.data;
};

export const editType = async (signal, typeID, name) => {
  const response = await $host.patch(`/api/type/${typeID}`, { signal, name });

  handleErrors(response);

  return response.data;
};
