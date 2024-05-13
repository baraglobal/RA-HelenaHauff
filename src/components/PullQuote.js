import { 
    useEffect, 
    useState, 
    useRef 
} from "react";
import useProgressiveImg from "../hooks/useProgressiveImage";
import PullQuoteImage from "./PullQuoteImage";


const PullQuote = (props) => {
  const { data } = props;

  const imagesWrapper = useRef();
  const [outline, setOutline] = useState(false);

  useEffect(()=>{

    const checkPositionOfImagesContainer = () => {
        if(imagesWrapper.current){
            const top = imagesWrapper.current.getBoundingClientRect().top;
            const bottom = top + imagesWrapper.current.clientHeight;

            if(top <= window.innerHeight && bottom >= 0){
                setOutline(true);
            } else {
                setOutline(false);
            }
        }
    }

    window.addEventListener("scroll", checkPositionOfImagesContainer);

  },[imagesWrapper]);


  const [focusActive, setFocusActive] = useState(false);
  const [focusImageSrc, setFocusImageSrc] = useState("");

  const [src, { blur }] = useProgressiveImg(
    `./images/thumbnail/${focusImageSrc}`,
    `./images/full-res/${focusImageSrc}`
  );
  const toggleFocusActive = (src) => {

    if(!focusActive){
        setFocusActive(true);
        setFocusImageSrc(src);
    } else {
        setFocusActive(false);
        setTimeout(()=>{
            setFocusImageSrc("");
        }, 400)
    }
  }

  return (
    <section className="pull-quote__container">
      <div className="pull-quote__text-wrapper">
        <h3 className={`pull-quote__text ${outline ? "outline" : ""}`}>{data.text}</h3>
      </div>
      <div className="pull-quote__images-container" ref={imagesWrapper}>
        {data.images.map((imageSrc, index) => {
          return (
            <PullQuoteImage key={index} imageSrc={imageSrc} toggleFocusActive={toggleFocusActive} />
          );
        })}
      </div>
      <div className="pull-quote__spacer"></div>


      <div className={`pull-quote__focus-container ${focusActive?'active':''}`} onClick={()=>toggleFocusActive()}>
      <img
          src={src}
          alt="C.002 Helena Hauff"
          className="pull-quote__focus-image"
          style={{
            filter: blur ? "blur(20px)" : "none",
            transition: blur ? "none" : "filter 0.3s ease-out",
          }}
          onClick={()=>toggleFocusActive()}
        />
        <button className="pull-quote__close-button" onClick={()=>toggleFocusActive()}/>
      </div>
    </section>
  );
};

export default PullQuote;
