import { $adminHost } from ".";

export const deleteVideo = async (signal, videoPath) => {
  const response = await $adminHost.delete(`/api/video/?video=${videoPath}`, { signal });

  handleErrors(response);

  return response.data;
}
