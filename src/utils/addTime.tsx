// @ts-nocheck
import moment from "moment";

interface TimeResponse {
  value: string; // 当前的时间，为2019-07-08T07:05:34.944Z格式
}

const addTime = (
  oldTime: TimeResponse,
  num: number,
  unit = "s"
): TimeResponse => {
  return {
    value: moment(oldTime.value, "MM/DD/YYYY, hh:mm:ss a")
      .add(num, unit)
      .toDate()
      .toLocaleString("en-US"),
  };
};

export default addTime;
