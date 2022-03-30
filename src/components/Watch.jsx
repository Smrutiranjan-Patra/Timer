import React, { useEffect, useState } from "react";
import "./css/watch.css";
import { AiTwotoneDelete } from "react-icons/ai";

const Watch = () => {
  const [hour, setHours] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lap, setLap] = useState([]);
  const [lapidx, setLapidx] = useState(1);
  useEffect(() => {
    if (isRunning) {
      var timer = setInterval(() => {
        setSecond(second + 1);
        if (second === 59 && minute === 59) {
          setMinute(0);
          setSecond(0);
          setHours(hour + 1);
        } else if (second === 59) {
          setMinute(minute + 1);
          setSecond(0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  });
  useEffect(() => {
    const lapdata = localStorage.getItem("lap");
    const hour = localStorage.getItem("hour");
    const minute = localStorage.getItem("minute");
    const second = localStorage.getItem("second");
    const running = localStorage.getItem("running");
    if (lap) {
      setLap(JSON.parse(lapdata));
    }
    if (second) {
      setSecond(JSON.parse(second));
    }
    if (minute) {
      setMinute(JSON.parse(minute));
    }
    if (hour) {
      setHours(JSON.parse(hour));
    }
    if (running) {
      setIsRunning(JSON.parse(running));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("lap", JSON.stringify(lap));
    localStorage.setItem("hour", hour);
    localStorage.setItem("minute", minute);
    localStorage.setItem("second", second);
    localStorage.setItem("running", isRunning);
  });

  function start() {
    isRunning ? setIsRunning(false) : setIsRunning(true);
  }
  function stop() {
    setIsRunning(false);
    setHours(0);
    setMinute(0);
    setSecond(0);
  }
  function reset() {
    setLap([]);
    setLapidx(1);
  }
  function lapset() {
    if (isRunning && lap.length <= 5) {
      const lapobj = {
        lapname: lapidx,
        laptime: `${hour < 10 ? "0" + hour : hour}:${
          minute < 10 ? "0" + minute : minute
        }:${second < 10 ? "0" + second : second}`,
      };
      setLap([...lap, lapobj]);
      setLapidx(lapidx + 1);
    } else if (!isRunning) {
      alert("Timer is not running");
    } else if (lap.length > 5) {
      alert("Lap Limit exceeded");
    }
  }
  function lapdelete(e) {
    let item = lap.filter((el) => {
      return el.name === e.name;
    });
    item.splice(0, 1);
    setLap(item);
  }
  return (
    <div className="watch">
      <div className="watchface">
        <h1 className="timer">
          {hour < 10 ? "0" + hour : hour}:{minute < 10 ? "0" + minute : minute}:
          {second < 10 ? "0" + second : second}
        </h1>
      </div>
      <div className="laps">
        {lap.map((e) => (
          <div className="lap" key={e.lapname}>
            <p className="lapname">Lap {e.lapname}</p>
            <p className="laptime">{e.laptime}</p>
            <button className="delbtn" onClick={() => lapdelete(e)}>
              <AiTwotoneDelete />
            </button>
          </div>
        ))}
      </div>
      <div className="button_box">
        <button onClick={start}>
          {isRunning === true ? "Pause" : "Start"}
        </button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <button onClick={lapset}>Lap</button>
      </div>
    </div>
  );
};

export default Watch;
