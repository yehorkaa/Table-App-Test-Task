import { IUserTable, IMappedUserTable } from "../../interfaces/table";

export const tableMapper = (data: IUserTable[]): IMappedUserTable[] => {
  const emailPhoneMap: Record<string, string> = {};

  return data.map((user, idx) => {
    const email = user["Email"].trim().toLocaleLowerCase();
    const phone = user["Phone"].trim();
  
    const date = new Date(user["Expiration date"].trim());
  
    const fullDate = `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
    const id = `${++idx}`;


    let duplicate_with = "No Duplicates";
    if (emailPhoneMap[email]) {
      duplicate_with = `Duplicate with ${emailPhoneMap[email]}`;
    } else if (emailPhoneMap[phone]) {
      duplicate_with = `Duplicate with ${emailPhoneMap[phone]}`;
    }

    emailPhoneMap[email] = id;
    emailPhoneMap[phone] = id;

    return {
      full_name: user["Full Name"].trim(),
      phone: phone,
      email: user["Email"].trim(),
      age: +user["Age"].trim(),
      experience: +user["Experience"].trim(),
      yearly_income: formatNumber(user["Yearly Income"].trim()),
      has_children: user["Has children"].trim(),
      license_states: formatLicenseStates(user["License states"].trim()),
      expiration_date: fullDate.includes("NaN")
        ? "Format should be YYYY-MM-DD or MM/DD/YYYY"
        : fullDate,
      license_number: user["License number"].trim(),
      id: id,
      duplicate_with: duplicate_with,
    };
  });
};

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
  const header = input.replace('_', ' ');
  if (header.split('_').length >= 2) {
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
