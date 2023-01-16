import React from "react";

const RuleGameBauCua = ({ setShowRule }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] flex justify-center items-center">
      <div className="relative w-2/3 h-2/3 bg-slate-600 rounded-2xl border-2 flex flex-col border-yellow-500 p-3">
        <div className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 ">
          <img
            onClick={() => setShowRule(false)}
            src="http://localhost:5173/cancel.png"
            className="w-14 cursor-pointer h-14 hover:scale-110 transition-all"
            alt=""
          />
        </div>
        <h2 className="text-center font-bold text-yellow-500 mb-1 text-[35px]">
          Hướng dẫn
        </h2>
        <div className="rounded-xl bg-slate-800 flex-1 px-5">
          <h3 className="text-center text-yellow-400 my-3 font-bold  tracking-[8px] uppercase">
            Bầu cua
          </h3>
          <div className="my-2 text-white ">
            <p className="text-2xl uppercase text-yellow-400 my-1">Cách chơi</p>
            <ul className="flex flex-col gap-3 pl-5">
              <li className="flex gap-3 items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>
                  Người chơi chỉ cần lựa chọn mức cược phù hợp và đặt cược
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <span>Đặt trúng 1 hình bắt kì:</span>
                <span>
                  <img
                    className="w-8 h-8 object-cover"
                    src="http://localhost:5173/gourd.png"
                    alt=""
                  />
                </span>
                <span>
                  <img
                    className="w-8 h-8 object-cover"
                    src="http://localhost:5173/crab.png"
                    alt=""
                  />
                </span>
                <span>
                  <img
                    className="w-8 h-8 object-cover"
                    src="http://localhost:5173/crayfish.png"
                    alt=""
                  />
                </span>
                <span>
                  <img
                    className="w-8 h-8 object-cover"
                    src="http://localhost:5173/fish.png"
                    alt=""
                  />
                </span>
                <span>
                  <img
                    className="w-8 h-8 object-cover"
                    src="http://localhost:5173/reindeer.png"
                    alt=""
                  />
                </span>
                <span>
                  <img
                    className="w-8 h-8 object-cover"
                    src="http://localhost:5173/rooster.png"
                    alt=""
                  />
                </span>
                <span className="text-xl font-bold text-green-400">
                  đặt 1 ăn 2
                </span>
              </li>
            </ul>
          </div>
          <div className="mt-2 text-white ">
            <p className="text-2xl uppercase text-yellow-400 my-1">Nổ hũ</p>
            <ul className="flex flex-col gap-3 pl-5 m-0">
              <li className="flex gap-3 items-center">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                <p className="m-0">
                  Khi 3 viên xúc sắc{" "}
                  <span className="text-xl text-green-400 font-bold">
                    {" "}
                    Giống nhau{" "}
                  </span>{" "}
                  sẽ nổ hũ
                </p>
              </li>
              <li className="">
                <div className="flex gap-3 items-center">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                  <span>Cách tính tiền Hũ:</span>
                  <div className="text-xl">
                    ({" "}
                    <span className="text-orange-400 uppercase font-bold">
                      tiền cược
                    </span>
                    {"  "}
                    <span className="mx-2">*</span>
                    <span className="text-orange-400  uppercase font-bold">
                      tiền hũ
                    </span>{" "}
                    )<span className="mx-2">/</span>
                    <span className="text-red-500 uppercase font-bold">
                      Tổng tiền đặt trong ô nổ hũ
                    </span>
                  </div>
                </div>
                <div className="px-5 my-3 italic">
                  <p className="m-0">
                    Ví dụ: Đặt 5M Gà, tiền trong ô Gà là 50M,{" "}
                    <span className="font-bold text-yellow-400">Hũ</span> có
                    700M <span></span> nhận tiền{" "}
                    <span className="font-bold text-yellow-400">Hũ</span> là:
                    <p className="my-1">
                      (
                      <span className="font-bold text-orange-400">
                        5.000.000
                      </span>
                      <span className="mx-2">*</span>
                      <span className="font-bold text-yellow-400">
                        700.000.000
                      </span>
                      )<span className="mx-2">/</span>
                      <span className="font-bold text-red-500">50.000.000</span>
                      <span className="mx-2">=</span>
                      <span className="font-bold text-green-500">
                        70.000.000
                      </span>
                    </p>
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <span className="my-1 font-bold text-red-600">
            (*) Lưu ý: Game chỉ mang tính chất học tập và giải trí, không cờ bạc
            và sẽ không chịu trách nhiệm trước pháp lý nếu có chuyện không mong
            muốn!
          </span>
        </div>
      </div>
    </div>
  );
};

export default RuleGameBauCua;
