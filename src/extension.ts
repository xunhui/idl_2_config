// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as prettier from 'prettier';
import { parseInterface } from './core/parse-interface';
import { CommandHandlerConfig, IDL2ConfigType } from './type';
import { genFinalResult } from './utils/gen-final-result';
import { parseTypeAlias } from './core/parse-type';

const COMMAND_HANDLER_CONFIG: CommandHandlerConfig[] = [
	{
		id: 'IDL2Config.parse2Form',
		type: IDL2ConfigType.OnlyForm,
		successMsg: 'Form options generated successfully!',
	},
	{
		id: 'IDL2Config.parse2Table',
		type: IDL2ConfigType.OnlyTable,
		successMsg: 'Table columns generated successfully!',
	},
	{
		id: 'IDL2Config.parse2Both',
		type: IDL2ConfigType.Both,
		successMsg: 'Configuration generated successfully!',
	}
];

const registerCommandFactory = ({ id, type, successMsg }: CommandHandlerConfig) => {
	return vscode.commands.registerCommand(id, () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return vscode.window.showErrorMessage('Please select an interface/type declare.');
		}

		try {
			// input
			const text = editor.document.getText(editor.selection);
			const interfaceParseRes = parseInterface('selection.ts', text, type);
			const typeParseRes = parseTypeAlias('selection.ts', text, type);
			if (!interfaceParseRes.length && !typeParseRes.length) {
				return vscode.window.showErrorMessage('The IDL you selected is in unsupported format.');
			}

			const finalRes = genFinalResult([...interfaceParseRes, ...typeParseRes]);
			// output
			vscode.env.clipboard.writeText(prettier.format(finalRes, { parser: 'typescript' })).then((res) => {
				vscode.window.showInformationMessage(successMsg);
			});
		} catch (error) {
			vscode.window.showErrorMessage((error as Error)?.message);
		}
	});
};

export function activate(context: vscode.ExtensionContext) {
	const disposableSet = COMMAND_HANDLER_CONFIG.map(config => {
		return registerCommandFactory({...config});
	});

	context.subscriptions.push(...disposableSet);
}