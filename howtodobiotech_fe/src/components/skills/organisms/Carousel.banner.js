import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.banner.module.css';

const CarouselBanner = () => {
  const items = [
    {
      image: '/assets/banner_skill1.png',
      title: 'Become enterpreneur in science!',
      description: 'Learn new expertise, gain skills how to run your own first biotech project abd build business idea.',
      ctaText: '',
      ctaLink: '',
    },
    {
      image: '/assets/banner_skill2.png',
      title: 'Fight with us\n against climate changes!',
      description: 'Bratislava city organizes \n  next Climathon Hackacthon.',
      ctaText: 'Apply',
      ctaLink: '/apply',
    }
  ];
  

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showArrows
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        infiniteLoop
        autoPlay
        interval={5000}
        transitionTime={700}
        swipeable
      >
        {items.map((item, index) => (
          <div key={index} className={styles.carouselItem}>
            <img src={item.image} alt={item.title} />
            <div className={styles.carouselText}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              {item.ctaText && (
                <button className={styles.ctaButton} onClick={() => window.location.href = item.ctaLink}>
                  {item.ctaText}
                </button>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselBanner;
