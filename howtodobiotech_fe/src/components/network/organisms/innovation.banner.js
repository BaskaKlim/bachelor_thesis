import React from 'react';
import CarouselBanner from '../organisms/innovation.banner';

const items = [
    {
      image: '../../../../public/assets/banner_network.png',
      title: 'First Slide Title',
      description: 'First slide description',
      ctaText: 'Learn More',
      ctaLink: '/learn-more-1',
    },
    {
      image: 'https://example.com/image2.jpg',
      title: 'Second Slide Title',
      description: 'Second slide description',
      ctaText: 'Join Now',
      ctaLink: '/join-now',
    },
    {
      image: 'https://example.com/image3.jpg',
      title: 'Third Slide Title',
      description: 'Third slide description',
      ctaText: 'Discover',
      ctaLink: '/discover',
    },
  ];

  const InnovationBanner = () => {
    return (
      <div>
        <CarouselBanner items={items} />
        {/* Other components and content for your main page */}
      </div>
    );
  };
  
  export default InnovationBanner;