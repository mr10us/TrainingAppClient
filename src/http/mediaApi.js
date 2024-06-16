import { handleErrors } from "@utils/handlers/http";
import { $authHost } from ".";

export const deleteVideo = async (signal, videoPath) => {
  const response = await $authHost.delete(`/api/media/?video=${videoPath}`, { signal });

  handleErrors(response);

  return response.data;
}

export const deleteImage = async (signal, imagePath) => {
  const response = await $authHost.delete(`/api/media/?image=${imagePath}`, { signal });

  handleErrors(response);

  return response.data;
}