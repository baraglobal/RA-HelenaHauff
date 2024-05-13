import React, { useEffect, useState } from "react";

const Loading = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 3) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        setProgress(0);
      }
    }, 100);
    return () => clearInterval(interval);
  });

  return (
    <header className="loading__wrapper">
      <h1>
        LOADING
        <span className={`loading__dot ${progress >= 1 ? "active" : ""}`}>
          .
        </span>
        <span className={`loading__dot ${progress >= 2 ? "active" : ""}`}>
          .
        </span>
        <span className={`loading__dot ${progress >= 3 ? "active" : ""}`}>
          .
        </span>
      </h1>
    </header>
  );
};

export default Loading;
