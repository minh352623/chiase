import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSkeleton from "./LoadingSkeleton";
import PostHome from "./PostHome";
import { setUpLoadPost } from "../store/reducers/authReducer";

const ListPost = () => {
  const navigate = useNavigate();
  const { isLoadPost } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState();
  const FetchPosts = async () => {
    try {
      const response = await axios({
        url: `/auth/post/home`,
      });
      console.log(response);
      if (response.status === 200) {
        setPosts(response.data);
      }
    } catch (e) {
      console.log(e);
      if (e.response.status == 401) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    FetchPosts();
  }, [isLoadPost]);

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
      {posts &&
        posts.map((post) => <PostHome key={post.id} item={post}></PostHome>)}
    </div>
  );
};

export default ListPost;
