import axiosInstance from "./axiosConfig";

export const api = {
  get: (url, params = {}, config = {}) =>
    axiosInstance.get(url, { params, ...config }),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};
