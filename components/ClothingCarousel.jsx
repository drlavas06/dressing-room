import React from 'react';
import { clothing } from './utils/Constants';
import CarouselItem from './CarouselItem';
import styles from './Crousel.module.css';

function ClothingCarousel({ section }) {

  return (
    <div className={styles.container}>
      <div className={styles.track}>
        {clothing.items[section]?.map((item) => (
          <CarouselItem section={section} item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default ClothingCarousel;
