import { useState, useEffect, useRef } from "react";

const IntroImage = (props) => {
  const { isMobile } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const requestRef = useRef();
  const [maskPosition, setMaskPosition] = useState(0);

  // A function to have the CSS gradient mask follow the cursor on desktop
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const newPosition = {
      x: (clientX / window.innerWidth) * 100,
      y: (clientY / window.innerHeight) * 100,
    };
    setMousePosition(newPosition);
  };

  // Then a function to have the mask move autonomosly on mobile, aiming to replicate the desktop effect
  const animate = (time) => {
    const newMaskPosition = 50 + 50 * Math.sin(time / 1000); // time in milliseconds
    setMaskPosition(newMaskPosition);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if(isMobile){
      requestRef.current = requestAnimationFrame(animate);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="intro__image-container">
      <div
        className="intro__image-wrapper"
        style={{ backgroundImage: 'url("./images/full-res/lead_edit.png")' }}
      />
      {!isMobile ? (
        <div
          className="intro__image-wrapper"
          onMouseMove={handleMouseMove}
          style={{
            backgroundImage: 'url("./images/full-res/lead.png")',
            maskImage: `radial-gradient(ellipse 50vw 50vw at ${mousePosition.x}% ${mousePosition.y}%, black 20%, transparent 50%)`,
          }}
        />
      ) : (
        <div
          className="intro__image-wrapper"
          style={{
            backgroundImage: 'url("./images/full-res/lead.png")',
            maskImage: `radial-gradient(ellipse 150vw 120vw at 50vw ${maskPosition}vh, black 20%, transparent 50%)`,
          }}
        />
      )}
    </div>
  );
};

export default IntroImage;
