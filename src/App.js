import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Data from "./assets/Data";

import Paragraph from "./components/Paragraph";
import PullQuote from "./components/PullQuote";
import StandFirst from "./components/StandFirst";

import Logo from "./components/Logo";
import Intro from "./components/Intro";
import Nav from "./components/Nav";
import Spotify from "./components/Spotify";
import Loading from "./components/Loading";
import Carousel from "./components/Carousel";
import Credits from "./components/Credits";
import TextToSpeech from "./components/TextToSpeach";

import "./styles/global-styles.scss";

function App() {
  const [pageData, setPageData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Import aticle text from data file
  useEffect(() => {
    if (Data) {
      setPageData(Data);
    }
  }, [Data]);

  // A handy hook for checking the screen dimensions, and dynamically setting the 100vh value
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

  // With the data as a JS object, it's now possible to break the content down into modules
  const components = {
    StandFirst,
    Paragraph,
    PullQuote,
    Carousel,
  };

  if (pageData) {
    return (
      <AnimatePresence mode="wait">

        {/* Fade the page in on load with the framer-motion package */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4 } }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
        >
          <Logo isMobile={isMobile}/>
          <Intro isMobile={isMobile}/>
          <Spotify isMobile={isMobile}/>
          <TextToSpeech data={pageData.content} />
          <main>
            <Nav data={pageData} />

            {/* This map checks the type of content coming in and matches it to a module */}
            {pageData.content &&
              pageData.content.map((data, index) => {
                const Component = components[data.type];
                return <Component data={data} key={index} isMobile={isMobile}/>;
              })}
          </main>
          <Credits data={pageData.info} />
        </motion.article>
      </AnimatePresence>
    );
  } else {
    // Show a preloader until the content is ready
    return <Loading />;
  }
}

export default App;
