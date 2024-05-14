import { useEffect, useState } from "react";

const Logo = (props) => {

  const {isMobile} = props;
  const [readTime, setReadTime] = useState(6);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (documentHeight - windowHeight > 0) {
        const currentScrollPercentage =
          (scrollTop / (documentHeight - windowHeight)) * 100;
        setProgress(currentScrollPercentage);
      }

      const totalScrollableDistance = documentHeight - windowHeight;
      const remainingScrollDistance = totalScrollableDistance - scrollTop;

      if (totalScrollableDistance > 0) {
        const remainingPercentage = Math.floor(
          (remainingScrollDistance / totalScrollableDistance) * 100 * 0.05 + 1
        );
        setReadTime(remainingPercentage);
      }
    };

    checkProgress();
    window.addEventListener("scroll", checkProgress);
  }, []);

  if (!isMobile) {
    return (
      <aside className="logo__wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -5 1300 600"
          className="logo__outline"
        >
          <path
            fill="transparent"
            stroke="#E52F28"
            strokeWidth="8"
            d="M420.99.62c11.2,1.31,22.49,2.11,33.6,3.96,48.84,8.1,93.06,27.14,130.3,59.84l162.35,155.86c-36.24,35.82-72.28,71.45-108.71,107.47l-127.21-130.01c-34.65-34.43-77.54-49.78-126.06-49.81l-215.56.46v76.05l206.07.78c29.19-.32,55.87,6.39,78.53,25.34l174.28,172.93c18.82,19.02,41.54,28.4,68.3,28.29l383.58-.27-273.61-276.25c36.52-37.1,72.73-73.89,109.67-111.42l344.7,348.9c9.25,9.22,17.47,19.05,20.89,32.05v10.66c-1.1,2.91-2.05,5.9-3.34,8.73-3.91,8.54-9.91,15.6-16.47,22.18-29.85,29.92-59.73,59.81-89.65,89.66-13.37,13.34-29.28,21.9-48.25,23.4l-488.83.58c-8.77-.03-17.7-1.55-26.27-3.59-19.03-4.56-34.52-15.38-48.22-29.07l-164.18-163.71c-18.61-18.8-40.59-29.05-67.17-29.02l-311.84.12V0l403.1.62h0Z"
          />
        </svg>
        <div className="logo__mask">
          <div className="logo__progress" style={{ width: `${progress}%` }} />
        </div>
        <h4 className="logo__read-time">
          READ TIME: {readTime} min{readTime > 1 || readTime === 0 ? "s" : ""}
        </h4>
      </aside>
    );
  } else {
    return (
      <div className="logo__progress-wrapper">
        <div className="logo__progress-text">
         <h4>READ TIME: {readTime} min{readTime > 1 || readTime === 0 ? "s" : ""}</h4> 
        </div>
        <div
          className="logo__progress-inner"
          style={{ width: `${progress}%` }}
        >
         <h4 className="logo__progress-reveal-text">READ TIME: {readTime} min{readTime > 1 || readTime === 0 ? "s" : ""}</h4> 
        </div>
      </div>
    );
  }
};

export default Logo;
