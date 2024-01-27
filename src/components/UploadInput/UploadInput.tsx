import { ChangeEvent, FC, forwardRef } from "react";
import styles from "./UploadInput.module.scss";

const UploadInput = forwardRef<
  HTMLInputElement,
  {
    handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
    handleClick: () => void;
  }
>(({ handleFileChange, handleClick }, ref) => {
  return (
    <div className={styles.input_container}>
      <label htmlFor="fileInput" className={styles.customFileInput} />
      <input
        type="file"
        id="fileInput"
        ref={ref}
        onChange={handleFileChange}
        accept=".csv"
        style={{ display: "none" }}
      />
      <button onClick={handleClick} className={styles.customButton}>
        Upload CSV
      </button>
    </div>
  );
});

export default UploadInput;
