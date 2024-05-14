import { useEffect, useState } from "react";
import IntroImage from "./IntroImage";

const Intro = () => {
  const [introProgress, setIntroProgress] = useState(0);

  useEffect(() => {
    let introInterval;
    const runIntro = () => {
      introInterval = setInterval(() => {
        if (introProgress < 5) {
          setIntroProgress((progress) => (progress += 1));
        } else {
          clearInterval(introInterval);
        }
      }, 800);
    };

    setTimeout(() => {
      runIntro();
    }, 400);
  }, []);

  return (
    <section className="intro__container">
      <IntroImage />
      <div
        className={`intro__line-wrapper ${
          introProgress > 0 && introProgress < 8 ? "active" : ""
        }`}
      >
        <div
          className={`intro__line ${introProgress > 2 ? "active" : ""}`}
        ></div>
      </div>

      <div
        className={`intro__text-container left ${
          introProgress > 4 ? "active" : ""
        }`}
      >
        <div className="intro__text left">
          <h2
            className={`intro__text-sub ${introProgress > 6 ? "active" : ""}`}
          >
            C.002
          </h2>
          <h1>HELENA HAUFF</h1>
          <h2
            className={`intro__text-sub ${introProgress > 6 ? "active" : ""}`}
          >
            THE RULES DONT APPLY
          </h2>
        </div>
      </div>
      <div
        className={`intro__text-container right ${
          introProgress > 4 ? "active" : ""
        }`}
      >
         <div className="intro__text right">
          <h2
            className={`intro__text-sub ${introProgress > 6 ? "active" : ""}`}
          >
            C.002
          </h2>
          <h1>HELENA HAUFF</h1>
          <h2
            className={`intro__text-sub ${introProgress > 6 ? "active" : ""}`}
          >
            THE RULES DONT APPLY
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Intro;
