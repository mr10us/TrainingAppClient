import { AxiosError } from "axios";

/**
 * Utils for http requests
 */
export const handleErrors = (error) => {
  if (error instanceof AxiosError) {
    if (!error?.response) throw Error(error.message);

    const customError = new Error(
      `${error.response.status} ${error.response.statusText}`
    );
    customError.data = error.response.data;
    throw customError;
  }
  return error;
};
