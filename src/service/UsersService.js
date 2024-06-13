import { get } from "../utils/request";
export const getUsers = () => {
  const result = get("/users");
  return result;
};
