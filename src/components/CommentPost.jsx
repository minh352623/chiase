import React from "react";
import { CaculateTime } from "../trait/CaculateTime";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const CommentPost = ({
  setShowReply,
  comment,
  item,
  user,
  handleLikeComment,
}) => {
  return (
    <div className="" key={comment.id + comment.createdAt + uuidv4()}>
      <div
        key={comment.id + comment.createdAt + comment.updatedAt + uuidv4()}
        className="my-2 xl:w-3/5 w-full xl:max-w-4/5 flex f gap-2"
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
              <Link
                to={`/profile/${comment.user_id}`}
                className="block text-black font-semibold my-1"
              >
                {comment?.user_data.firstName +
                  " " +
                  comment?.user_data.lastName}
              </Link>
              <span>{comment.text}</span>
              {comment.like_count > 0 && (
                <p className="absolute flex gap-1 m-0  right-0 bottom-[-8px] shadow-xl px-3 py-1 rounded-full bg-white">
                  <span>
                    <img src="../like_color.png" className="w-[20px]" alt="" />
                  </span>
                  <span>{comment.like_count}</span>
                </p>
              )}
            </div>
          )}
          {comment.file && (
            <p className="w-[30%] m-0">
              <img className="w-full object-cover " src={comment.file} alt="" />
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
              //   onClick={() => setShowReply((showReply) => !showReply)}
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

      {/* <div
                      className=""
                      key={comment.id + comment.createdAt + uuidv4()}
                    >
                      <div
                        key={
                          comment.id +
                          comment.createdAt +
                          comment.updatedAt +
                          uuidv4()
                        }
                        className="my-2 xl:w-3/5 w-full xl:max-w-4/5 flex f gap-2"
                      >
                        <p className="w-[10%]">
                          <img
                            className="w-full rounded-full object-cover"
                            src={
                              comment?.user_data?.avatar
                                ? comment?.user_data?.avatar
                                : "./undraw_profile.svg"
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
                                      src="./like_color.png"
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
                              onClick={() =>
                                setShowReply((showReply) => !showReply)
                              }
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
                        key={comment.id + comment.createdAt + uuidv4()}
                        listComment={item.comment_data}
                        id_parent={comment.id}
                        id_post={item.id}
                        rank={1}
                        user={user}
                        handleLikeComment={handleLikeComment}
                      ></RenderComment>
                    </div> */}
    </div>
  );
};

export default CommentPost;
