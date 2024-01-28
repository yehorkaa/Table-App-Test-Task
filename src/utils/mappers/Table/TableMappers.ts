import { IUserTable, IMappedUserTable } from "../../../interfaces/table";
import { formatNumber, formatLicenseStates } from './TableFormatters';

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