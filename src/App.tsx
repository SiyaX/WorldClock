import { useState } from "react";
import "./App.css";
import addTime from "./utils/addTime";
import useInterval from "./utils/useInterval";
import syncTime from "./api/syncTime";
import BoxTable from "./components/BoxTable";

function App() {
  interface TimeResponse {
    value: string; // 当前的时间，为2019-07-08T07:05:34.944Z格式
  }

  const [localTime, setLocalTime] = useState<TimeResponse>({
    value: new Date().toLocaleString(),
  });

  // Update time every second
  useInterval(() => {
    setLocalTime(addTime(localTime, 1));
  }, 1000);

  // Sync time every minute
  useInterval(() => {
    syncTime()
      .then((result) => {
        console.log("Sync Time" + result.value);
        setLocalTime(result);
      })
      .catch((err) => alert(err));
  }, 60_000);

  return (
    <>
      <h1 style={{ marginTop: "200px" }}>🌏 A Mini World Clock App 🕑</h1>
      <p>
        Written by Siya Xie. <br /> Source code 🔗{" "}
        <a href="https://github.com/SiyaX/WorldClock">
          https://github.com/SiyaX/WorldClock
        </a>
      </p>
      <div className="container">
        <table>
          <BoxTable localTime={localTime} />
        </table>
      </div>
    </>
  );
}

export default App;
