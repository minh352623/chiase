import React from "react";

const ImagesProfile = ({ images }) => {
  return (
    <div className="p-3 bg-white rounded-lg shadow_main">
      <h5 className="text-black font-bold mb-4">Ảnh</h5>
      <div className="mt-2">
        <div className="grid grid-cols-12 gap-3">
          {images.length > 0 &&
            images.map((image) => (
              <div className="col-span-2 h-full max-h-[200px]">
                <img src={image?.link} className="object-cover h-full" alt="" />
              </div>
            ))}
          {images.length <= 0 && (
            <div className="flex items-center justify-center text-black font-semibold">
              Không có ảnh
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesProfile;
