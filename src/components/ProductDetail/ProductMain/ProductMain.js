import styles from "./ProductMain.module.css";

export const ProductMain = ({ imgLink, brand, descText, status }) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imgContainer}>
        <div className={styles.tag}>{status}</div>
        <img src={imgLink} className={styles.mainImage} alt="product pic" />
      </div>
      <div className={styles.container}>
        <div>
          <p className={styles.detailsHead}>Details</p>
          <div className={styles.detailsContainer}>
            <p className={styles.detailsText}>Brand </p>
            <p className={styles.detailsText}>{brand} </p>
          </div>
        </div>
        <div>
          <p className={styles.descHead}>Description</p>
          <div className={styles.descTextStyle}>{descText}</div>
        </div>
      </div>
    </div>
  );
};
