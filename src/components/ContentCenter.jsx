import React from "react";
import ListPost from "./ListPost";
import Status from "./Status";
import Story from "./Story";

const ContentCenter = ({ user, socket }) => {
  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      <Story user={user}></Story>
      <Status user={user}></Status>
      <ListPost socket={socket}></ListPost>
    </div>
  );
};

export default ContentCenter;
