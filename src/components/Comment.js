import React, { useEffect, useState } from "react";
import { getComment } from "../service/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const Comment = (props) => {
  const [comments, setComments] = useState([]);
  const [commentUser, setCommentUser] = useState([]);
  const { idTour } = props;

  useEffect(() => {
    const getComments = async () => {
      const result = await getComment();
      setComments(result.data);
    };
    getComments();
  }, []);

  useEffect(() => {
    const result = comments.filter((comment) => comment.idTour === idTour);
    setCommentUser(result);
  }, [comments]);
  return (
    <div className="my-10">
      <h3 className="font-bold text-lg mb-3">Đánh giá gần đây</h3>
      <hr />
      {commentUser.map((item) => {
        return (
          <div className="flex items-start gap-10 py-3 border-b">
            <div className="flex items-center w-[20%]">
              <FontAwesomeIcon icon={faUser} />
              <p className="mx-2 font-bold">{item.commenter}</p>
            </div>
            <div className="flex flex-col gap-2 w-[80%]">
              <div className="flex items-center gap-3">
                <p className="bg-lime-500 px-2 py-[2px] rounded-md text-white font-bold">
                  {item.rating}
                </p>
                <p className="text-orange font-bold">Rất tốt </p>
                <p className="text-sm font-bold text-neutral-400">
                  {item.date}
                </p>
              </div>
              <div>
                <p>{item.content} </p>
              </div>
              <div>
                <p className="bg-[#ccc] p-2 rounded-md">{item.contentServer}</p>
              </div>
              <div className="flex gap-10">
                <div className="flex flex-col">
                  <p className="font-bold">Thích</p>
                  <hr />
                </div>
                <div className="flex flex-col">
                  <p className="font-bold">Phản hồi</p>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
