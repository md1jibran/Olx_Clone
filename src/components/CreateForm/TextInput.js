import styles from "./TextInput.module.css";

export const TextInput = ({ title, type, onChange }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <input
        id="textID"
        className={styles.textinput}
        type={type}
        onChange={onChange}
      />
    </div>
  );
};
