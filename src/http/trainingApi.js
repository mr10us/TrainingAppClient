import { $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getTrainings = async (signal, query, page) => {
  const queryParams = query ? "?" + query + `&page=${page}` : `?page=${page}`;
  const response = await $host.get(`/api/trainings/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getTraining = async (signal, trainingID) => {
  const response = await $host.get(`/api/trainings/${trainingID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createTraining = async (signal, training) => {
  const response = await $host.post(`/api/trainings/`, {
    signal,
    ...training,
  });

  handleErrors(response);

  return response.data;
};

export const editTraining = async (signal, trainingID, training) => {
  const response = await $host.put(`/api/trainings/${trainingID}`, {
    signal,
    ...training,
  });

  handleErrors(response);

  return response.data;
};
