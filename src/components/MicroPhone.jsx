import React from "react";
import { useSelector } from "react-redux";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const MicroPhone = () => {
  const { searchVoice } = useSelector((state) => state.user);

  return (
    <div className="fixed z-[1000] top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]  flex justify-center items-center">
      <div className="absolute z-[1000] w-[400px] h-[400px] rounded-lg mx-auto shadow-lg text-white bg-slate-800 flex gap-2 flex-col justify-center items-center">
        <span className="text-xl">Bạn muốn tìm kiếm gì?</span>
        <p className="my-3">{searchVoice ? searchVoice : "Đang nghe....."}</p>
        <p className="p-3 bg-red-500 rounded-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-10 h-10 animate-ping-custom"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
            />
          </svg>
        </p>

        <p
          onClick={SpeechRecognition.stopListening}
          className="px-4 py-2 bg-slate-600 text-slate-50 rounded-sm cursor-pointer transition-all hover:scale-110"
        >
          Cancel
        </p>
      </div>
    </div>
  );
};

export default MicroPhone;
