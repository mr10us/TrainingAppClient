import { $authHost } from "./index";
import { handleErrors } from "@utils/handlers/http";

export const getTrainings = async (pageParam, query, signal) => {
  const queryParams = query
    ? `?page=${pageParam}&${query}`
    : `?page=${pageParam}`;
  const response = await $authHost.get(`/api/training/${queryParams || ""}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const getTraining = async (signal, trainingID) => {
  const response = await $authHost.get(`/api/training/${trainingID}/`, { signal });

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

  const response = await $authHost.post(`/api/training/`, formData, {
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

  
  const response = await $authHost.patch(
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
  const response = await $authHost.delete(`/api/training/${trainingID}`, {
    signal,
  });

  handleErrors(response);

  return response.data;
};

export const addReview = async (signal, trainingID, review, rating, userID) => {
  const response = await $authHost.post("/api/training/review", {
    signal,
    trainingID,
    userID,
    review,
    rating
  });

  handleErrors(response);

  return response.data;
}
