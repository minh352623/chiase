import axios from "axios";
import React, { createRef, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "./LoadingSkeleton";
import PostHome from "./PostHome";
import { setUpLoadPost } from "../store/reducers/authReducer";
import { ToastContainer, toast } from "react-toastify";
import { handleFetchNotis, setLoopNoti } from "../store/reducers/userReducer";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const ListPost = ({ socket, id_user, q = "" }) => {
  const navigate = useNavigate();
  const { isLoadPost, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [posts, setPosts] = useState();
  const [comments, setComments] = useState();
  const [loadingComment, setLoadingComment] = useState(false);
  const FetchPosts = async () => {
    try {
      let response;
      if (id_user) {
        response = await axios({
          url: `/auth/post/home/?id_user=` + id_user + "&q=" + q,
        });
      } else {
        response = await axios({
          url: `/auth/post/home` + "/?q=" + q,
        });
      }
      console.log(response);
      if (response.status === 200) {
        const arrnew = response.data.map((item) => {
          item.comment_data = item.comment_data.sort((a, b) => -(a.id - b.id));
          return item;
        });
        console.log(arrnew);
        setPosts((pre) => [...arrnew]);
        // setPosts(response.data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    socket.off("getLike");
    socket.off("getComment");
    socket.off("getNotiLikeComment");

    // socket.current = io("ws://localhost:8900");
    socket?.on("getLike", (data) => {
      if (data.likerId == data.ownPost) {
      } else {
        if (!data.status) {
          let myAudio = new Audio("./notification-125767.mp3");
          myAudio.play();
          toast.success(`${data.nameLiker}: ${data.text}!`, {
            position: "top-right",
            autoClose: 1500,
          });
        }
      }
      FetchPosts();
      dispatch(handleFetchNotis());
    });
    socket?.on("getComment", (data) => {
      if (data.commenter == data.ownPost) {
      } else {
        let myAudio = new Audio("./notification-125767.mp3");
        myAudio.play();
        toast.success(`${data.nameCommenter}: ${data.text}!`, {
          position: "top-right",
          autoClose: 1500,
        });
      }
      FetchPosts();
      dispatch(handleFetchNotis());
    });
    socket?.on("getNotiLikeComment", (data) => {
      console.log(data);
      if (data.liker == data.ownComment) {
      } else {
        if (!data.status) {
          let myAudio = new Audio("./notification-125767.mp3");
          myAudio.play();
          toast.success(
            `${data.nameLiker}: ${data.text}, trong bài viết của ${data.ownPost}!`,
            {
              position: "top-right",
              autoClose: 1500,
            }
          );
        }
      }
      FetchPosts();

      dispatch(handleFetchNotis());
    });
  }, []);
  useEffect(() => {
    FetchPosts();
  }, [isLoadPost]);
  const elRefs = React.useRef([]);
  useEffect(() => {
    let arrLength = posts?.length || 0;
    if (elRefs.current.length !== arrLength) {
      // add or remove refs
      elRefs.current = Array(arrLength)
        .fill()
        .map((_, i) => elRefs.current[i] || createRef());
    }
  }, [posts]);
  const createLikePost = async (idPost, ownPost, status) => {
    try {
      console.log(idPost);
      const response = await axios({
        url: "/auth/like",
        method: "POST",
        data: {
          user_id: user?.id,
          avatar_like: user?.avatar ? user.avatar : null,
          post_id: idPost,
          ownPost: ownPost,
          text:
            user?.firstName +
            " " +
            user?.lastName +
            ": Đã thích bài viết của bạn",
        },
      });
      if (response.status === 200) {
        console.log(response);
        socket?.emit("likePost", {
          likerId: user?.id,
          nameLiker: user?.firstName + " " + user?.lastName,
          ownPost: ownPost,
          status: status,
          text: "Đã thích bài viết của bạn",
        });
        FetchPosts();
      }
    } catch (e) {
      if (e.response.status == 404) {
        Swal.fire("Bài viết!", e.response.data, "error");
      }
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const createComment = async (file, content, post_id, ownPost) => {
    try {
      console.log(file);
      console.log(content);
      if (file || content) {
        setLoadingComment(true);
        let formData = new FormData();
        formData.append("file", file[0] || "");
        formData.append("content", content);
        formData.append("post_id", post_id);
        formData.append("user_id", user?.id);
        formData.append("avatar_comment", user?.avatar ? user.avatar : "");

        formData.append("ownPost", ownPost);
        formData.append(
          "text",
          user?.firstName +
            " " +
            user?.lastName +
            ": Đã bình luận 1 bài viết của bạn"
        );

        const response = await axios({
          method: "POST",
          url: "auth/comment",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: formData,
        });
        if (response.status === 200) {
          socket?.emit("commentPost", {
            commenter: user?.id,
            nameCommenter: user?.firstName + " " + user?.lastName,
            ownPost: ownPost,
            text: "Đã bình luân 1 bài viết của bạn",
          });
          FetchPosts();
          setLoadingComment(false);

          console.log(response);

          return response.data;
        }
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 404) {
        Swal.fire("Bài viết!", e.response.data, "error");
      }
      setLoadingComment(false);

      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const createLikeComment = async (idComment, ownComment, ownPost, status) => {
    try {
      const response = await axios({
        method: "POST",
        url: "/auth/comment/like",
        data: {
          user_id: user?.id,
          avatar_comment: user?.avatar ? user.avatar : null,

          comment_id: idComment,
          ownComment: ownComment,
          text:
            user?.firstName +
            " " +
            user?.lastName +
            ": Đã thích bình luận của bạn" +
            " trong bài viết của" +
            ownPost,
        },
      });

      if (response.status === 200) {
        console.log(response);
        socket?.emit("createLikeComment", {
          liker: user?.id,
          nameLiker: user?.firstName + " " + user?.lastName,
          ownComment: ownComment,
          ownPost: ownPost,
          status: status,
          text: "Đã thích comment của bạn",
        });
        // if (!status) {
        FetchPosts();
        // }
      }
    } catch (e) {
      if (e.response.status == 404) {
        Swal.fire("Bài viết!", e.response.data, "error");
      }
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const handleDeltePost = async (id) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: "/auth/post/" + id,
      });
      if (response.status === 200) {
        console.log(response);
        FetchPosts();
      }
    } catch (e) {
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  const handleEditPostParent = async (id, content) => {
    try {
      const response = await axios({
        method: "PATCH",
        url: "/auth/post/" + id,

        data: {
          content: content,
        },
      });
      if (response.status === 200) {
        // navigate("/admin/user");

        toast.success("Cập nhật bài viết thành công!", {
          position: "top-right",
          autoClose: 2000,
        });
        FetchPosts();
      }
    } catch (e) {
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  if (!posts)
    return (
      <>
        <div className="w-full">
          <LoadingSkeleton className="w-full h-[300px] rounded-lg"></LoadingSkeleton>
        </div>
      </>
    );

  return (
    <div>
      {posts.length > 0 &&
        posts.map((post, index) => (
          <PostHome
            loadingComment={loadingComment}
            createLikeComment={createLikeComment}
            user={user}
            handleEditPostParent={handleEditPostParent}
            handleDeltePost={handleDeltePost}
            createComment={createComment}
            createLikePost={createLikePost}
            key={post.id + uuidv4()}
            item={post}
            socket={socket}
          ></PostHome>
        ))}
      {posts.length <= 0 && (
        <div className="p-3 text-red-500 shadow_main bg-white mt-3 rounded-xl">
          Chưa có bài viết
        </div>
      )}
    </div>
  );
};

export default ListPost;
