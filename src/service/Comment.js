import { get } from "../utils/request";

export const getComment = () => {
  const result = get("/comments");
  return result;
};
