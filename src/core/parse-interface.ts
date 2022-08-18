import * as ts from 'typescript';
import { ConfigKind, FormOptionsConfig, IDL2ConfigType, TableColumnsConfig } from '../type';
import { genFormOption } from '../utils/gen-form-option';
import { genTableColumn } from '../utils/gen-table-column';

export function parseInterface(fileName: string, fileSource: string, config: IDL2ConfigType) {
  const sourceFile = ts.createSourceFile(fileName, fileSource, ts.ScriptTarget.ES2015);
  
  const formOptionsConfigSet: FormOptionsConfig[] = [];
  const tableColumnsConfigSet: TableColumnsConfig[] = [];
  // traverse node iterable
  const traverseNode = (node: ts.Node) => {
    console.log(node.kind);
    // interface declare
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceId = node.name.text; // interface id
      formOptionsConfigSet.push({
        type: ConfigKind.Form,
        key: interfaceId + 'FormOptions',
        details: []
      });
      tableColumnsConfigSet.push({
        type: ConfigKind.Table,
        key: interfaceId + 'Columns',
        details: []
      });

      const handlePropertySignature = (node: ts.Node) => {
        if (ts.isPropertySignature(node)) {
          const getPropertyNodeKey = (node: ts.Node) => {
            if (ts.isIdentifier(node)) {
              formOptionsConfigSet.find(config => config.key === interfaceId + 'FormOptions')?.details.push(genFormOption(node.text));
              tableColumnsConfigSet.find(config => config.key === interfaceId + 'Columns')?.details.push(genTableColumn(node.text));
            }
          };
          ts.forEachChild(node, getPropertyNodeKey);
        }
      };
      ts.forEachChild(node, handlePropertySignature);
    }
    ts.forEachChild(node, traverseNode);
  };

  traverseNode(sourceFile);

  if (config === IDL2ConfigType.OnlyForm) {
    return formOptionsConfigSet;
  }
  if (config === IDL2ConfigType.OnlyTable) {
    return tableColumnsConfigSet;
  }
  return [...formOptionsConfigSet, ...tableColumnsConfigSet];
}