import { get } from "../utils/request";

export const getAllTour = () => {
  const result = get("/tours");
  return result;
};

export const getTour = (id, limit) => {
  const result = get(`/tours?catagoryId=${id}&_limit=${limit}`);
  return result;
};

export const getTourId = (id) => {
  const result = get(`/tours?id=${id}`);
  return result;
};

export const getCategory = () => {
  const result = get("/catagories");
  return result;
};

export const getPayment = () => {
  const result = get("/payment");
  return result;
};
