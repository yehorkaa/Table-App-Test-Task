import { FC } from "react";

const CSVFallback: FC<{ message: string }>= ({ message }) => {
  return (
    <h2>
        {message || 'No Content so far...'}
    </h2>
  )
};

export default CSVFallback;
