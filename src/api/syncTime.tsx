interface TimeResponse {
  value: string; // 当前的时间，为2019-07-08T07:05:34.944Z格式
}

// Define Promise
const syncTime = (): Promise<TimeResponse> => {
  return new Promise<TimeResponse>(function (resolve, reject) {
    setTimeout(
      () =>
        Math.random() < 0.3
          ? reject(new Error("Random Time Syncing Error!"))
          : resolve({ value: new Date().toLocaleString("en-US") }),
      800
    );
  });
};

export default syncTime;
