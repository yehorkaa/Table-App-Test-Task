import { FC } from "react";
import { IMappedUserTable } from "../../interfaces/table";
import { validField } from "../../utils/validation_schemas/table_schemas";
import styles from "./CSVTable.module.scss";
import cn from "classnames";
import { formatHeader } from "../../utils/mappers/AppMappers";

const CSVTable: FC<{
  data: IMappedUserTable[];
  error: Record<"message", string>;
}> = ({ data, error }) => {
  const headers = data.length
    ? (Object.keys(data[0]) as Array<keyof IMappedUserTable>)
    : [];
  return (
    <>
      {data.length === 0 || error.message.length ? (
        <p>{error.message || "No content so far..."}</p>
      ) : (
        <table className={styles.tableStyle}>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={Math.random()} className={styles.tableHeaderStyle}>
                  {formatHeader(header)}
                </th>
              ))}
            </tr>
          </thead>
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
        </table>
      )}
    </>
  );
};

export default CSVTable;
