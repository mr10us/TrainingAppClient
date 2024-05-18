import { $adminHost, $host } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getTrainings = async (pageParam, query, signal) => {
  const queryParams = query
    ? `?page=${pageParam}&${query}`
    : `?page=${pageParam}`;
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

export const createTraining = async (
  signal,
  title,
  content,
  execTime,
  gender,
  level,
  preview,
  exercises
) => {
  const formData = new FormData();
  title && formData.append("title", title);
  content && formData.append("content", content);
  preview && formData.append("image", preview);
  execTime && formData.append("exec_time", execTime);
  gender && formData.append("gender", gender);
  level && formData.append("level", level);
  exercises && formData.append("exercises", JSON.stringify(exercises));

  const response = await $adminHost.post(`/api/training/`, formData, {
    signal,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  handleErrors(response);

  return response.data;
};

export const editTraining = async (
  signal,
  trainingID,
  title,
  content,
  execTime,
  gender,
  level,
  preview,
  exercises
) => {
  const formData = new FormData();
  title && formData.append("title", title);
  content && formData.append("content", content);
  preview && formData.append("image", preview);
  execTime && formData.append("exec_time", execTime);
  gender && formData.append("gender", gender);
  level && formData.append("level", level);
  exercises && formData.append("exercises", JSON.stringify(exercises));

  
  const response = await $adminHost.patch(
    `/api/training/${trainingID}`,
    formData,
    {
      signal,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  handleErrors(response);

  return response.data;
};

export const deleteTraining = async (signal, trainingID) => {
  const response = await $adminHost.delete(`/api/training/${trainingID}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};
