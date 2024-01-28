import { IisShowTable } from "../../../interfaces/table";

export function formatNumber(numString: string) {
  const num = parseFloat(numString);

  const hasDecimal = numString.includes(".");

  if (hasDecimal) {
    const roundedNum = num.toFixed(2);

    return roundedNum.toString();
  } else {
    return num.toFixed(2).toString();
  }
}

export function formatLicenseStates(input: string) {
  const words = input.split(" ");

  const abbreviations = words.map((word) => {
    const firstLetter = word[0] || "";

    if (word.length > 1) {
      const secondLetter = word[1] || "";
      return `${firstLetter.toUpperCase()}${secondLetter.toUpperCase()}`;
    }

    return firstLetter.toUpperCase();
  });

  return abbreviations.join(" | ");
}

export function formatHeader(input: string) {
  const header = input.replace("_", " ");
  if (header.split("_").length >= 2) {
    return header
      .split("")
      .map((word) => {
        return capitalizeFirstLetter(word);
      })
      .join(" ");
  } else {
    return capitalizeFirstLetter(header);
  }
}

export function capitalizeFirstLetter(str: string) {
  return str.slice(0, 1).toUpperCase() + str.slice(1).toLocaleLowerCase();
}

export function isShowTable({ data, error }: IisShowTable) {
  return data.length === 0 || error.length;
}
