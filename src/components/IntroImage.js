import { useState } from "react";

const IntroImage = (props) => {
  const { isMobile } = props;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const newPosition = {
      x: (clientX / window.innerWidth) * 100,
      y: (clientY / window.innerHeight) * 100,
    };
    setMousePosition(newPosition);
  };

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
            maskImage: `radial-gradient(ellipse 150vw 120vw at 50vw 30vh, black 20%, transparent 50%)`,
          }}
        />
      )}
    </div>
  );
};

export default IntroImage;
