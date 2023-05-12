import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from '../../organisms/common/Carousel.banner.module.css';

const CarouselBanner = () => {
const items = [
    {
      image: '/assets/banner_network.png',
      title: 'Who is who in biotech ecosystem?',
      description: 'Explore biotech innovations in CEE and search for help from professional mentors with science, business and legal background. ',
      ctaText: '',
      ctaLink: '',
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
        interval={10000}
        transitionTime={1200}
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