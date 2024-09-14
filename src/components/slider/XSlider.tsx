// import Carousel from "react-elastic-carousel";
import "./xslider.css";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";

import react, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import {
  FaArrowAltCircleLeft,
  FaRegArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import { sliderData } from "../sliderData";

export const XSlider = () => {
  const myRef = useRef<any>();

  // console.log("height", window.screen.availHeight);
  // console.log("width", window.screen.availWidth);

  const [isNext, setNext] = useState(false);

  useEffect(() => {
    myRef.current.slickPlay();

    if (isNext === true) {
      myRef.current.slickNext();
      setNext(false);
    }
  }, [isNext]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          draggable: true,
          swipeToSlide: true,
          touchMove: true,
        },
      },
    ],
  };

  return (
    <div className="App">
      <div className="container">
        <Slider ref={myRef} {...settings}>
          {sliderData.map((data, index) => {
            return (
              <div key={index}>
                {/* <div className="imageContainer">
                  <div className="image_position">
                    <img
                      src={data.image}
                      className="sliderImages"
                      alt="slider"
                    />
                  </div>
                </div> */}

                <Card data={data} />
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

function Card({ data }: any) {
  // const [curPos, setPos] = useState([0, 0, 1]);
  const [opacity, setOpacity] = useState(false);

  // const calc = (x, y) => [
  //   -(y - window.innerHeight / 2) / 40,
  //   (x - window.innerWidth / 2) / 40,
  //   1.1
  // ];

  // const style = useSpring({
  //   backfaceVisibility: "hidden",
  //   transform: `perspective(600px) rotateX(${curPos[0]}deg) rotateY(${curPos[1]}deg) scale(${curPos[2]})`,
  //   config: { mass: 5, tension: 350, friction: 40 }
  // });

  // const style = useSpring({
  //   backfaceVisibility: "hidden",
  //   opacity: `(${opacity}%)`,
  //   config: { mass: 5, tension: 350, friction: 40 }
  // });

  const style = useSpring({
    // opacity: opacity ? 1 : 0,
    transform: opacity ? `scale(1.1)` : `scale(1)`,
    config: { mass: 10, tension: 390, friction: 10 },

  });

  return (
    <div
      className="imageContainer"
      // key={index}
    >
      <div className="image_position">
        <div className="image" style={{ width: "600px" }}>
          <animated.img
            onMouseMove={() => setOpacity(true)}
            onMouseLeave={() => setOpacity(false)}
            // onMouseLeave={() => setPos([0, 0, 1])}
            style={style}
            src={data.image}
            className="sliderImages"
            alt="slider"
          />
        </div>
        <div className="textContainer">
          <div className="videoName">{data.videoName} </div>
          <div className="videoGenre">{data.videoGenre}</div>
          <div className="videoDesc">{data.videoDesc}</div>
        </div>
      </div>
    </div>
  );
}
