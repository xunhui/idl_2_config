import { TableColumn } from "../type";
import { snake2Camel } from "./snake-2-camel";

export const genTableColumn = (field: string): TableColumn => {
  const camelCaseField = snake2Camel(field);
  return {
    dataIndex: field,
    title: camelCaseField,
  };
};

