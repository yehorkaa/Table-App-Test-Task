import React from "react";
import CSVTable from "../CSVTable/CSVTable";
import { useFile } from "../../hooks/useFile";
import styles from "./App.module.scss";
import UploadInput from "../UploadInput/UploadInput";

const App: React.FC = () => {
  const { csvData, handleFileChange, error, ref, handleClick } = useFile();

  return (
    <div>
      <div className={styles.container}>
        <UploadInput ref={ref} handleFileChange={handleFileChange} handleClick={handleClick} />
        <CSVTable data={csvData} error={error} />
      </div>
    </div>
  );
};

export default App;
