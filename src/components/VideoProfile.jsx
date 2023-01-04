import React from "react";

const VideoProfile = ({ videos }) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow_main">
      <h5 className="text-black font-bold mb-4">Video</h5>
      <div className="mt-2">
        <div className="grid grid-cols-12 gap-3">
          {videos.length > 0 &&
            videos.map((video) => (
              <div className="col-span-3 h-[250px]">
                <video
                  controls
                  src={video?.link}
                  className="object-cover h-full"
                  alt=""
                />
              </div>
            ))}
          {videos.length <= 0 && (
            <div className="flex items-center justify-center text-black font-semibold">
              Không có video
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoProfile;
