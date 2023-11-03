import styles from "./ProductSide.module.css";

export const ProductSide = ({ price, description, location, date }) => {
  return (
    <div className={styles.container}>
      <p className={styles.priceText}>{price}</p>
      <p className={styles.descText}>{description}</p>
      <div className={styles.bottomText}>
        <p className={styles.locationText}>{location}</p>
        <p className={styles.locationText}>{date}</p>
      </div>
    </div>
  );
};
