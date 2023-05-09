import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.banner.module.css';

const CarouselBanner = () => {
  const items = [
    {
      image: '/assets/banner_network.png',
      title: 'First Slide Title',
      description: 'First slide description',
      ctaText: 'Learn More',
      ctaLink: '/learn-more-1',
    },
    {
      image: '/assets/banner_network.png',
      title: 'Second Slide Title',
      description: 'Second slide description',
      ctaText: 'Join Now',
      ctaLink: '/join-now',
    },
    {
      image: '/assets/banner_network.png',
      title: 'Third Slide Title',
      description: 'Third slide description',
      ctaText: 'Discover',
      ctaLink: '/discover',
    },
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
