import { useRef, useState } from "react";
const Carousel = (props) => {

  // The original idea here was to use a light WebGL shader to give the images small trails, adding depth and movement to the carousel
  // see https://chromatic-london.vercel.app/ for reference
  // The shader ended up being a little too heavy so I opted for a CSS3D solution instead

  //As the user moves the mouse around, the perspective-origin on the element is changed to give a sense of depth
  // There is also a subtle bounce animation on the center image to make the carousel feel less static

  
  const { data, isMobile } = props;

  const [perspectiveOrigin, setPerspectiveOrigin] = useState({ x: 0, y: 0 });

  const handlePerspective = (e) => {
    if(!isMobile){
      const perspectiveOriginX = `${(e.clientX / window.innerWidth) * 100}%`;
      const perspectiveOriginY = `${(e.clientY / window.innerHeight) * 100}%`;
      setPerspectiveOrigin({ x: perspectiveOriginX, y: perspectiveOriginY });
    }
  };

  const leftImage = useRef();
  const centerImage = useRef();
  const rightImage = useRef();

  const removeAllClasses = () => {
    leftImage.current.classList.remove('left', 'center', 'right');
    centerImage.current.classList.remove('left', 'center', 'right');
    rightImage.current.classList.remove('left', 'center', 'right');
  }

  const handleLeft = () => {
    removeAllClasses();
    leftImage.current.classList.add('center');
    centerImage.current.classList.add('right');
    rightImage.current.classList.add('left');
  };

  const handleCenter = () => {
    removeAllClasses();
    leftImage.current.classList.add('left');
    centerImage.current.classList.add('center');
    rightImage.current.classList.add('right');
  };

  const handleRight = () => {
    removeAllClasses();
    leftImage.current.classList.add('left');
    centerImage.current.classList.add('right');
    rightImage.current.classList.add('center');
  };

  return (
    <section className="carousel__container" onMouseMove={handlePerspective}>
      <div
        className="carousel__wrapper"
        style={{
          perspectiveOrigin: `${perspectiveOrigin.x} ${perspectiveOrigin.y}`,
        }}
      >
        <div
          ref={leftImage}
          className="carousel__image-wrapper left"
          style={{
            backgroundImage: `url('./images/carousel/${data.images[0]}')`,
          }}
          onClick={handleLeft}
        />
        <div
          ref={centerImage}
          className="carousel__image-wrapper center"
          style={{
            backgroundImage: `url('./images/carousel/${data.images[1]}')`,
          }}
          onClick={handleCenter}
        />
        <div
          ref={rightImage}
          className="carousel__image-wrapper right"
          style={{
            backgroundImage: `url('./images/carousel/${data.images[2]}')`,
          }}
          onClick={handleRight}
/>
      </div>
    </section>
  );
};

export default Carousel;
