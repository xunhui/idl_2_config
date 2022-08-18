import { FormOptionsConfig, TableColumnsConfig } from "../type";

export function genFinalResult(parseResult: (FormOptionsConfig | TableColumnsConfig)[]) {
  if (!parseResult?.length) {return '';}

  return parseResult.reduce((acc, cur) => {
    const { key, details } = cur;
    return acc.concat(`export const ${key} = ${JSON.stringify(details)};`);
  }, '');
}