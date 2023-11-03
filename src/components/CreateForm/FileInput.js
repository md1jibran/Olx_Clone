import styles from "./FileInput.module.css";

export const FileInput = ({ displayComponent, onChange }) => {
  console.log(onChange);
  return (
    <div>
      <div className={styles.title}>Upload Photo</div>
      <label htmlFor="productImg">{displayComponent}</label>
      <input
        onChange={(e) => {
          onChange(e.target.files[0]);
        }}
        id="productImg"
        hidden
        type="file"
      />
    </div>
  );
};
