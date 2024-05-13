import { $adminHost, $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getExercises = async (pageParam, query, signal) => {
  const queryParams = query ? `?page=${pageParam}&${query}` : `?page=${pageParam}`;
  const response = await $host.get(`/api/exercise/${queryParams || ""}`, { params: signal });

  handleErrors(response);

  return response.data;
};

export const getExercise = async (signal, exerciseID) => {
  const response = await $host.get(`/api/exercise/${exerciseID}/`, { signal });

  handleErrors(response);

  return response.data;
};

export const createExercise = async (signal, title, content, videoFile) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("content", content);
  formData.append("video", videoFile);

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
