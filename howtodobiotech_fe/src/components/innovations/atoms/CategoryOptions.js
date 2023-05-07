import React from 'react';
import styles from './CategoryOptions.module.css';

const categoryOptions = [
  { id: 1, name: 'MEDICINE', imageUrl: '/assets/medicine.jpg', color: '#E35149' },
  { id: 2, name: 'BIOINFORMATICS', imageUrl: '/assets/bioinformatics.jpg', color: '#110777' },
  { id: 3, name: 'ENERGY', imageUrl: '/assets/energy.jpg', color: '#7369ff' },
  { id: 4, name: 'FOOD', imageUrl: '/assets/food.jpg', color: '#FF928F' },
  { id: 5, name: 'ENVIRONMENTAL', imageUrl: '/assets/environmental.jpg', color: '#91B3FA' },
  { id: 6, name: 'AGRICULTURE', imageUrl: '/assets/agriculture.jpg', color: '#A22B25' },
  { id: 7, name: 'MARINE', imageUrl: '/assets/marine.jpg', color: '#4B4DF7' },
];

const CategoryOptions = ({ onCategoryClick }) => {
  return (
    <div className={styles.categoryOptionsContainer}>
      {categoryOptions.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryClick(category.id)}
          style={{ backgroundColor: category.color }}
          className={styles.categoryButton}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryOptions;
