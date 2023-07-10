import React, { useState } from "react";
import Slick from "react-slick";

import {
  CloseBtn,
  Global,
  Header,
  ImgWrapper,
  Indicator,
  Overlay,
  SlickWrapper,
} from "./style";
interface Image {
  src: string;
}

interface ImagesZoomProps {
  images: Image[];
  onClose: () => void;
}

const ImagesZoom = ({ images, onClose }: ImagesZoomProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                <img src={v.src} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

export default ImagesZoom;
