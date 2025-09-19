import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

const ReactSlick = ({ offers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnDotsHover: true,
  };

  return (
    <div className="slider-section">
      <div className="slider-wrapper">
        {offers.length > 0 ? (
          <Slider {...settings}>
            {offers.map((offer) => (
              <div className="slider-slide" key={offer.id}>
                <img
                  className="slider-img"
                  src={offer.image_url}
                  alt={`offer-${offer.id}`}
                />
              </div>
            ))}
          </Slider>
        ) : (
          <p>No offers available</p>
        )}
      </div>
    </div>
  );
};

export default ReactSlick;