import { FormOption } from "../type";
import { snake2Camel } from "./snake-2-camel";

export const genFormOption = (field: string): FormOption => {
  const camelCaseField = snake2Camel(field);
  return {
    field,
    label: camelCaseField,
    placeholder: `Please Input ${camelCaseField}`
  };
};