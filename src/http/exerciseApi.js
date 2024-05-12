import { $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getExercises = async (signal, query) => {
  const queryParams = query ? "?" + query : null;
  const response = $host.get(`/api/exercise/${queryParams || ""}`, { signal });

  handleErrors(response);

  return response.data;
};

export const getExercise = async (signal, exerciseID) => {
  const response = await $host.get(`/api/exercise/${exerciseID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createExercise = async (signal, title, content, video) => {
  const response = await $host.post(`/api/exercise/`, {
    signal,
    title,
    content,
    video,
  });

  handleErrors(response);

  return response.data;
};

export const editExercise = async (
  signal,
  exerciseID,
  title,
  content,
  video
) => {
  const response = await $host.put(`/api/exercise/${exerciseID}`, {
    signal,
    title,
    content,
    video,
  });

  handleErrors(response);

  return response.data;
};
