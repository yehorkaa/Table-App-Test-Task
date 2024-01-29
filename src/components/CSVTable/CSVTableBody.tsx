import { FC } from "react";
import { ICSVTableBody } from "../../interfaces/table";
import { validField } from "../../utils/validation_schemas/table_schemas";
import styles from "./CSVTable.module.scss";
import cn from "classnames";

const CSVTableBody: FC<ICSVTableBody> = ({ data, headers }) => {
  return (
    <tbody>
      {data.map((row, index) => {
        return (
          <tr key={index}>
            {headers.map((header) => (
              <td
                key={Math.random()}
                className={cn(
                  validField({ type: header, value: row[header], row })
                    ? styles.tableCellStyle
                    : styles.tableErrorCellStyle
                )}
              >
                {row[header]}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default CSVTableBody;
