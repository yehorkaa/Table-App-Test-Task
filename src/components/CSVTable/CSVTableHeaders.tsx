import { FC } from "react";
import { formatHeader } from "../../utils/mappers/Table/TableFormatters";
import styles from './CSVTable.module.scss';
import { ICSVTableHeaders } from '../../interfaces/table'

const CSVTableHeaders: FC<ICSVTableHeaders> = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={Math.random()} className={styles.tableHeaderStyle}>
            {formatHeader(header)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CSVTableHeaders;