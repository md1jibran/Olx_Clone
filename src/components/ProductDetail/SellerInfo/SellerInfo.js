import styles from "./SellerInfo.module.css";

export const SellerInfo = ({ profilePic, name, email, phone }) => {
  return (
    <div className={styles.container}>
      <p className={styles.heading}>Seller Description</p>
      <div className={styles.profileContainer}>
        <img
          className={styles.profileImg}
          src={
            !!profilePic
              ? profilePic
              : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile pic"
        />
        <div className={styles.itemContainer}>
          <p className={styles.profileText}>{name}</p>
          <p className={styles.dateText}>{`Email: ${email}`}</p>
          <p className={styles.dateText}>{`PhoneNo: ${phone}`}</p>
        </div>
      </div>
    </div>
  );
};
