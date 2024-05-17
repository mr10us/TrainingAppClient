import { $adminHost, $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getExercises = async (pageParam, query, signal) => {
  const queryParams = query
    ? `?page=${pageParam}&${query}`
    : `?page=${pageParam}`;
  const response = await $host.get(`/api/exercise/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getExercise = async (signal, exerciseID) => {
  const response = await $host.get(`/api/exercise/${exerciseID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createExercise = async (
  signal,
  title,
  content,
  videoFile,
  types,
  categories
) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("video", videoFile);
  types && formData.append("types", types);
  categories && formData.append("categories", categories);

  const response = await $adminHost.post(`/api/exercise/`, formData, {
    signal,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  handleErrors(response);

  return response.data;
};

export const editExercise = async (
  signal,
  exerciseID,
  title,
  content,
  videoFile,
  types,
  categories
) => {
  const formData = new FormData();
  title && formData.append("title", title);
  content && formData.append("content", content);
  videoFile && formData.append("video", videoFile);
  types && formData.append("types", types);
  categories && formData.append("categories", categories);

  const response = await $adminHost.patch(`/api/exercise/${exerciseID}`, formData, {
    signal,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  handleErrors(response);

  return response.data;
};

export const deleteExercise = async (signal, exerciseID) => {
  const response = await $adminHost.delete(`/api/exercise/${exerciseID}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};
