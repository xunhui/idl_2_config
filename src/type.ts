export enum IDL2ConfigType {
  OnlyForm = 1,
  OnlyTable = 2,
  Both = 3
}

export enum ConfigKind {
  Form = 'form',
  Table = 'Table'
}

export interface FormOption {
  field: string,
  label: string,
  placeholder: string,
  type?: string; // TODO
}

export interface TableColumn {
  title: string;
  dataIndex: string;
  render?: string; // (...args: any[]) => any; // TODO
  width?: number;
}

export interface FormOptionsConfig {
  type: ConfigKind.Form;
  key: string;
  details: FormOption[];
}

export interface TableColumnsConfig {
  type: ConfigKind.Table;
  key: string;
  details: TableColumn[];
}

export interface CommandHandlerConfig {
  id: string;
  type: IDL2ConfigType,
  successMsg: string;
}