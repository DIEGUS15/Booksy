import axiosInstance from "./axios.js";

export const registerRequest = (user) => axiosInstance.post(`/register`, user);

export const loginRequest = (user) => axiosInstance.post(`/login`, user);

export const verifyTokenRequest = () => axiosInstance.get(`/verify`);
