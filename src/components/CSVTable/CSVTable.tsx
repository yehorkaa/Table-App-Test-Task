import { FC } from "react";
import { ICSVTable } from "../../interfaces/table";
import styles from "./CSVTable.module.scss";
import CSVTableHeaders from "./CSVTableHeaders";
import CSVTableBody from "./CSVTableBody";
import CSVFallback from "./CSVFallback";
import { isShowTable } from "../../utils/mappers/Table/TableFormatters";

const CSVTable: FC<ICSVTable> = ({ data, error, headers }) => {
  return (
    <>
      {isShowTable({ data, error: error.message }) ? (
        <CSVFallback message={error.message} />
      ) : (
        <table className={styles.tableStyle}>
          <CSVTableHeaders headers={headers} />
          <CSVTableBody data={data} headers={headers} />
        </table>
      )}
    </>
  );
};

export default CSVTable;
