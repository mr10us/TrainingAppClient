import { handleErrors } from "@utils/handlers/http";
import { $adminHost } from ".";

export const deleteVideo = async (signal, videoPath) => {
  const response = await $adminHost.delete(`/api/media/?video=${videoPath}`, { signal });

  handleErrors(response);

  return response.data;
}

export const deleteImage = async (signal, imagePath) => {
  const response = await $adminHost.delete(`/api/media/?image=${imagePath}`, { signal });

  handleErrors(response);

  return response.data;
}