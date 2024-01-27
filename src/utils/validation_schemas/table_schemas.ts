import { number, string } from "yup";
import { MappedTableValues, MappedTableKeys } from "../../interfaces/table";

export const validField = ({
  type,
  value,
  row,
}: {
  type: MappedTableKeys;
  value: MappedTableValues;
  row: Record<MappedTableKeys, MappedTableValues>;
}) => {

  switch (type) {
    case "full_name":
      return string().required().isValid(value);
    case "age":
      return number()
        .required()
        .positive()
        .integer()
        .min(21)
        .isValidSync(value);
    case "email":
      return string().email().required().isValidSync(value);
    case "phone":
      return string()
        .required()
        .test((value) => `${value}`.split("+1")[1]?.length === 10)
        .isValidSync(value);
    case "experience":
      return number()
        .required()
        .positive()
        .min(0)
        .test((experience) => experience <= +row.age)
        .isValidSync(value);
    case "has_children":
      return string()
        .required()
        .test((value) => {
          if (value === "") return true;
          const lowercaseValue = value.toLowerCase();
          return lowercaseValue === "true" || lowercaseValue === "false";
        })
        .isValidSync(value);
    case "license_number":
      return string()
        .matches(/^[\d\w]{6}$/)
        .isValidSync(value);
    case "license_states":
      return string().isValidSync(value);
    case "yearly_income":
      return string()
        .test((value) => {
          if (value) {
            const num = +value;
            return num > 0 && num < 1000000;
          }
        })
        .isValidSync(value);
    case "expiration_date":
      return string()
        .test((value) => {
          if (!value) {
            return true;
          }
          const dateRegEx1 = /^\d{4}-\d{2}-\d{2}$/;
          const dateRegEx2 = /^\d{2}\/\d{2}\/\d{4}$/;
          return dateRegEx1.test(value) || dateRegEx2.test(value);
        })
        .isValidSync(value);
  }

  return true;
};
