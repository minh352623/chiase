import React, { useState } from "react";
import { useSelector } from "react-redux";
import ContentCenter from "../../components/ContentCenter";
import ContentLeft from "../../components/ContentLeft";
import ContentRight from "../../components/ContentRight";
import LayoutClient from "../../layouts/LayoutClient";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <LayoutClient>
      <div className="grid grid-cols-12 gap-5 p-3 bg-gray-200 h-[91.5vh]">
        <div className="xl:col-span-3 xl:block hidden">
          <ContentLeft user={user}></ContentLeft>
        </div>
        <div className="content_center xl:col-span-6 col-span-12 overflow-y-auto">
          <div className="xl:px-5 px-2">
            <ContentCenter user={user}></ContentCenter>
          </div>
        </div>
        <div className="xl:col-span-3 xl:block hidden">
          <ContentRight></ContentRight>
        </div>
      </div>
    </LayoutClient>
  );
};

export default Home;
