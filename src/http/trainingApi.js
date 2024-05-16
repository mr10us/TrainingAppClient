import { $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getTrainings = async (page, query, signal) => {
  const queryParams = query ? "?" + query + `&page=${page}` : `?page=${page}`;
  const response = await $host.get(`/api/training/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getTraining = async (signal, trainingID) => {
  const response = await $host.get(`/api/training/${trainingID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createTraining = async (signal, training) => {
  const response = await $host.post(`/api/training/`, {
    signal,
    ...training,
  });

  handleErrors(response);

  return response.data;
};

export const editTraining = async (signal, trainingID, training) => {
  const response = await $host.put(`/api/training/${trainingID}`, {
    signal,
    ...training,
  });

  handleErrors(response);

  return response.data;
};
