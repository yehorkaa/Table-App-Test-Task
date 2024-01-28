import {FC} from "react";
import CSVTable from "../CSVTable/CSVTable";
import { useFile } from "../../hooks/useFile";
import styles from "./App.module.scss";
import UploadInput from "../UploadInput/UploadInput";

const App: FC = () => {
  const { csvData, handleFileChange, error, ref, handleClick, headers } = useFile();

  return (
    <div>
      <div className={styles.container}>
        <UploadInput ref={ref} handleFileChange={handleFileChange} handleClick={handleClick} />
        <CSVTable data={csvData} error={error} headers={headers} />
      </div>
    </div>
  );
};

export default App;
