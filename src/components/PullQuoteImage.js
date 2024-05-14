import { useEffect, useState } from "react";

const PullQuoteImage = (props) => {

    const {
        imageSrc, 
        toggleFocusActive,
        isMobile
    } = props;

    const [marginLeft, setMarginLeft] = useState(0);
    useEffect(()=>{
        if(!isMobile){
             const newMarginLeft = Math.floor(Math.random() * 100);
        setMarginLeft(newMarginLeft);
        }
     
    },[])

  return (
    <div className="pull-quote__image-wrapper">
    <img
      className="pull-quote__image"
      style={{ marginLeft: `${marginLeft}%` }}
      src={`./images/thumbnail/${imageSrc}`}
      alt="C.002 Helena Hauff"
      onClick={()=>toggleFocusActive(imageSrc)}
    />
  </div>
  )
}

export default PullQuoteImage