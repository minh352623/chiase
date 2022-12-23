const CaculateTime = (time) => {
  let message = "abc";
  let timeNew = Math.floor(new Date() - new Date(time)) / 1000 / 60 / 60;
  console.log(timeNew);
  if (timeNew < 1) {
    message = parseFloat(timeNew * 60).toFixed(0) + " phút";
  }
  if (timeNew >= 1 && timeNew < 24) {
    message = parseFloat(timeNew).toFixed(0) + " giờ";
  }
  if (timeNew > 24) {
    message = parseFloat(timeNew / 24).toFixed(0) + " ngày";
  }

  return message + " trước";
};

export { CaculateTime };
