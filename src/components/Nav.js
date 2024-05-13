import React from "react";

const Nav = (props) => {
  const { data } = props;

  return (
    <>
      <div className="nav__wrapper top">
        <div className="nav__tablet">
          {data.info.code}:
          <span className="alt-font"> {data.info.artist} </span>
          :{data.info.subTitle}
          <h4 className="nav__published">PUBLISHED: {data.info.published}</h4>
        </div>
      </div>
      <div className="nav__wrapper bottom">
        <div className="nav__tablet">
          WORDS: {data.info.words}, IMAGES: {data.info.images}
        </div>
      </div>
    </>
  );
};

export default Nav;
