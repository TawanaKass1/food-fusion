import React from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import image1 from '../../utils/Images/burg.jpg';
import image2 from '../../utils/Images/tea.jpg';
import image3 from '../../utils/Images/catalayn_chicken.jpg'; // Add as many as you want

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Full-width slider container
const SlideshowContainer = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  @media (max-width: 768px) {
    max-height: 250px;
  }
`;


const SlideImage = styled.img`
  width: 90%;
  height:100%;
  object-fit: cover; 
  object-position: center;

`;

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const ImageSlideshow = () => {
  const images = [image1, image2, image3];

  return (
    <SlideshowContainer>
      <Slider {...sliderSettings}>
        {images.map((img, index) => (
          <div key={index}>
            <SlideImage src={img} alt={`Slide ${index}`} />
          </div>
        ))}
      </Slider>
    </SlideshowContainer>
  );
};

export default ImageSlideshow;
