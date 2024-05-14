import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Data from "./assets/Data";

import Paragraph from "./components/Paragraph";
import PullQuote from "./components/PullQuote";
import Logo from "./components/Logo";
import Intro from "./components/Intro";
import Nav from "./components/Nav";

import "./styles/global-styles.scss";
import StandFirst from "./components/StandFirst";
import Spotify from "./components/Spotify";
import Loading from "./components/Loading";
import Carousel from "./components/Carousel";
import Credits from "./components/Credits";
import TextToSpeech from "./components/TextToSpeach";

function App() {
  const [pageData, setPageData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (Data) {
      setPageData(Data);
    }
  }, [Data]);

  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--app-height", `${window.innerHeight}px`);
    };

    const checkScreenWidth = () => {
      if (window.innerWidth < 750) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", setAppHeight);
    window.addEventListener("resize", checkScreenWidth);

    setAppHeight();
    checkScreenWidth();

    return () => {
      window.removeEventListener("resize", setAppHeight);
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const components = {
    StandFirst,
    Paragraph,
    PullQuote,
    Carousel,
  };

  if (pageData) {
    return (
      <AnimatePresence mode="wait">
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          <Logo />
          <Intro />
          <Spotify />
          <TextToSpeech data={pageData.content} />
          <main className="main-article">
            <Nav data={pageData} />
            {/* <StandFirst data={pageData.info.standFirst} /> */}
            {pageData.content &&
              pageData.content.map((data, index) => {
                const Component = components[data.type];
                return <Component data={data} key={index} />;
              })}
          </main>
          <Credits data={pageData.info} />
        </motion.article>
      </AnimatePresence>
    );
  } else {
    return <Loading />;
  }
}

export default App;
