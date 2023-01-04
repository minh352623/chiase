import React, { useEffect, useState } from "react";
import { CaculateTime } from "../trait/CaculateTime";
import { v4 as uuidv4 } from "uuid";

const RenderComment = ({
  listComment,
  id_parent,
  id_post,
  rank,
  user,
  handleLikeComment,
}) => {
  const [ml, setMl] = useState("");
  useEffect(() => {
    setMl(`ml-[${rank * 12}px]`);
  }, []);
  return (
    <>
      {listComment.map((comment) => {
        if (comment.parent_id == id_parent) {
          return (
            <div
              className={`${
                rank == 1 ? "ml-[40px]" : rank == 2 ? "ml-[80px]" : ""
              }`}
              key={comment.id + comment.updatedAt + uuidv4()}
            >
              <div
                key={comment.id + comment.updatedAt + uuidv4()}
                className={` my-2 w-3/5 flex f gap-2 max-w-4/5`}
              >
                <p className="w-[10%]">
                  <img
                    className="w-full rounded-full object-cover"
                    src={
                      comment?.user_data?.avatar
                        ? comment?.user_data?.avatar
                        : "../undraw_profile.svg"
                    }
                    alt=""
                  />
                </p>
                <div className="w-[95%] ">
                  {comment.text && (
                    <div className="relative m-0 px-2 py-1 bg-gray-300 rounded-lg text-black">
                      <span className="block font-semibold my-1">
                        {comment?.user_data.firstName +
                          " " +
                          comment?.user_data.lastName}
                      </span>
                      <span>{comment.text}</span>
                      {comment.like_count > 0 && (
                        <p className="absolute flex gap-1 m-0  right-0 bottom-[-8px] shadow-xl px-3 py-1 rounded-full bg-white">
                          <span>
                            <img
                              src="../like_color.png"
                              className="w-[20px]"
                              alt=""
                            />
                          </span>
                          <span>{comment.like_count}</span>
                        </p>
                      )}
                    </div>
                  )}
                  {comment.file && (
                    <p className="w-[30%] m-0">
                      <img
                        className="w-full object-cover "
                        src={comment.file}
                        alt=""
                      />
                    </p>
                  )}
                  <div className="flex gap-3">
                    {comment?.like_comment_data.some(
                      (item) => item.user_id === user?.id
                    ) ? (
                      <span
                        onClick={() =>
                          handleLikeComment(
                            comment.id,
                            comment.user_id,
                            comment?.like_comment_data.some(
                              (item) => item.user_id === user?.id
                            )
                          )
                        }
                        className={`font-bold cursor-pointer hover:underline-offset-auto text-blue-400`}
                      >
                        Thích
                      </span>
                    ) : (
                      <span
                        onClick={() =>
                          handleLikeComment(
                            comment.id,
                            comment.user_id,
                            comment?.like_comment_data.some(
                              (item) => item.user_id === user?.id
                            )
                          )
                        }
                        className={`font-bold cursor-pointer hover:underline-offset-auto hover:text-blue-400 `}
                      >
                        Thích
                      </span>
                    )}
                    <span
                      className={`font-bold cursor-pointer hover:underline hover:text-blue-400 `}
                    >
                      Phản hồi
                    </span>
                    <span className="font-semibold cursor-pointer">
                      {CaculateTime(comment.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <RenderComment
                listComment={listComment}
                id_parent={comment.id}
                id_post={id_post}
                rank={rank + 1}
                user={user}
              ></RenderComment>
            </div>
          );
        }
      })}
    </>
  );
};

export default RenderComment;
