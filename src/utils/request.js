import axios from "axios";
const API_DOMAIN = process.env.REACT_APP_BACKEND_URL + "/api";

export const get = async (path = "") => {
  const result = await axios(API_DOMAIN + path);
  return result;
};

export const post = async (path, listInfo) => {
  const result = await axios.post(
    API_DOMAIN + path,
    { ...listInfo },
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  return result.data;
};
