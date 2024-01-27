import { useState, ChangeEvent, useRef } from "react";
import { IMappedUserTable, IUserTable } from "../interfaces/table";
import { tableMapper } from "../utils/mappers/AppMappers";

export const useFile = () => {
  const [csvData, setCsvData] = useState<IMappedUserTable[]>([]);
  const [error, setError] = useState({ message: "" });
  const ref = useRef<HTMLInputElement>(null);

  // Знаю, що можно було заюзати папарсер, але думаю самописного теж буде достатньо для задачі
  const parseCSV = (csvText: string) => {
    const lines = csvText.split("\n");
    const headers = lines[0].split(",");
    if (
      !headers.includes("Full Name") ||
      !headers.includes("Phone") ||
      !headers.includes("Email")
    ) {
      setError({ message: "Missed required fields!" });
      return;
    } else {
      setError({ message: "" });
    }

    const parsedData: IUserTable[] = [];

    for (let i = 1; i < lines.length; i++) {
      const currentLine = lines[i].split(",");

      if (currentLine.length === headers.length) {
        const row = {} as IUserTable;
        for (let j = 0; j < headers.length; j++) {
          row[headers[j].trim()] = currentLine[j].trim();
        }

        parsedData.push(row);
      }
    }
    console.log(parsedData)
    setCsvData(tableMapper(parsedData));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const csvText = e?.target?.result as string;
        if (csvText) {
          parseCSV(csvText);
        } else {
          setCsvData([]);
          setError({ message: "" });
        }
      };

      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    const fileInput = ref;
    fileInput.current?.click();
  };

  return { csvData, handleFileChange, error, ref, handleClick };
};
