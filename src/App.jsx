import { useEffect, useState } from "react";

export default function App() {
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(0);
  const [clockMinutes, setClockMinutes] = useState(0);
  const [clockSeconds, setClockSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(
    function () {
      if (!isRunning) return;
      if (clockMinutes === 0 && clockSeconds === 0) return;
      const interval = setInterval(function () {
        setClockSeconds((prevClockSeconds) => {
          if (prevClockSeconds > 0) return prevClockSeconds - 1;
          if (prevClockSeconds === 0 && clockMinutes > 0) return 59;
          return 0;
        });

        setClockMinutes((prevClockMinutes) => {
          if (clockSeconds === 0) return prevClockMinutes - 1;
          return prevClockMinutes;
        });
      }, 1000);

      return () => clearInterval(interval);
    },
    [isRunning, clockMinutes, clockSeconds]
  );

  function handleChangeMinutes(e) {
    setInputMinutes(e.currentTarget.value);
  }

  function handleChangeSeconds(e) {
    setInputSeconds(e.currentTarget.value);
  }

  function handleStartClick() {
    const mins = Number(inputMinutes);
    const secs = Number(inputSeconds);

    if (mins === 0 && secs === 0) return;
    if (mins < 0 || secs < 0) return;

    if (secs > 60) {
      setClockMinutes(mins + Math.floor(secs / 60));
      setClockSeconds(secs % 60);
    } else {
      setClockMinutes(mins);
      setClockSeconds(secs);
    }

    setInputMinutes(0);
    setInputSeconds(0);
    setIsRunning(true);
  }

  function handlePauseResumeClick() {
    setIsRunning((prev) => !prev);
  }

  function handleResetClick() {
    setInputMinutes(0);
    setInputSeconds(0);
    setClockMinutes(0);
    setClockSeconds(0);
    setIsRunning(false);
  }

  const clock = `${
    String(clockMinutes).length === 1 ? `0${clockMinutes}` : clockMinutes
  }:${String(clockSeconds).length === 1 ? `0${clockSeconds}` : clockSeconds}`;

  return (
    <div>
      <div>
        <input
          type='number'
          value={inputMinutes}
          onChange={handleChangeMinutes}
        />
        <input
          type='number'
          value={inputSeconds}
          onChange={handleChangeSeconds}
        />
      </div>
      <br />
      <div>
        <button onClick={handleStartClick}>Start</button>
        <button onClick={handlePauseResumeClick}>Pause/Resume</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
      <br />
      <div>{clock}</div>
    </div>
  );
}
