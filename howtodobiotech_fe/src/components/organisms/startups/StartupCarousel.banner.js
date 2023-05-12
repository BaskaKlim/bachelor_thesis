import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from '../../organisms/common/Carousel.banner.module.css';

const CarouselBanner = () => {
  const items = [
    {
      image: '/assets/banner_startup1.png',
      title: 'Find opportunity for your startup!',
      description: 'Search for investment funds, acceleration support or mentoring from enterpreneurs and experts in CEE region.',
      ctaText: '',
      ctaLink: '',
    },
    {
      image: '/assets/banner_startup2.png',
      title: 'Backing visionary \n entrepreneurs!',
      description: 'The European Innovation Council \n EIC Accelerator',
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
