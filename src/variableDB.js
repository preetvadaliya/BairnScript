/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the variable database logic of BiarnScript.
 */

const VARIBLE_DB = {
	VARIABLES: {},
	BLOCKS: {},
	FUNCTIONS: {},
};

function createVariable(workspace, block) {
	let variableNameList = workspace.getAllVariableNames();
	let currentVariableName = block.getFieldValue('VAR_NAME');
	if (variableNameList.includes(currentVariableName)) {
		let i = 1;
		while (true) {
			if (variableNameList.includes(currentVariableName + i)) {
				i++;
			} else {
				break;
			}
		}
		workspace.createVariable(currentVariableName + i, null, block.id);
	} else {
		workspace.createVariable(currentVariableName, null, block.id);
	}
	VARIBLE_DB.VARIABLES[block.id] = workspace.getVariableById(block.id);
	block.setFieldValue(workspace.getVariableById(block.id).name, 'VAR_NAME');
	block.getField('VAR_NAME').setValidator(block.validate.bind(block));
}

function deleteVariable(variableId) {
	if (!(Blockly.getMainWorkspace().getVariableById(variableId) === null)) {
		Blockly.getMainWorkspace().deleteVariableById(variableId);
		delete VARIBLE_DB.VARIABLES[variableId];
	}
}

function updateVariable(variableId, newVariableName) {
	if (!(Blockly.getMainWorkspace().getVariableById(variableId) === null)) {
		Blockly.getMainWorkspace().renameVariableById(variableId, newVariableName);
		VARIBLE_DB.VARIABLES[variableId]['name'] = newVariableName;
	}
}

function updateGetBlock(block, workspace) {
	block.removeInput('VAR_DD', true);
	Blockly.FieldVariable.dropdownCreate = function () {
		let variables = workspace.getAllVariables();
		let options = [];
		variables.forEach((element) => {
			options.push([element.name, element.getId()]);
		});
		return options;
	};
	block
		.appendDummyInput('VAR_DD')
		.appendField('get')
		.appendField(new Blockly.FieldVariable(workspace.getAllVariableNames()[0]), 'OP');
}

function updateSetBlock(block, workspace) {
	block.removeInput('VAR_DD', true);
	Blockly.FieldVariable.dropdownCreate = function () {
		let variables = workspace.getAllVariables();
		let options = [];
		variables.forEach((element) => {
			options.push([element.name, element.getId()]);
		});
		return options;
	};
	block
		.appendValueInput('VAR_DD')
		.setCheck(null)
		.appendField('set')
		.appendField(new Blockly.FieldVariable(workspace.getAllVariableNames()[0]), 'OP')
		.appendField('to');
}

function makeItDisabled(workspace) {
	let blocks = workspace.getAllBlocks();
	blocks.forEach((block) => {
		if (block.type === 'VARIABLES_GET' || block.type === 'VARIABLES_SET') {
			if (block.type === 'VARIABLES_GET') {
				if (!block.outputConnection.isConnected()) {
					block.setEnabled(false);
				} else {
					block.setEnabled(true);
				}
			}
		}
	});
}

Blockly.getMainWorkspace().addChangeListener(function (e) {
	let workspace = Blockly.getMainWorkspace();
	let block = e.blockId === null ? null : workspace.getBlockById(e.blockId);

	if (e.type === Blockly.Events.BLOCK_CREATE && block.type === 'VARIABLES_INIT_GLOBAL') {
		createVariable(workspace, block);
	}
	if (e.type === Blockly.Events.BLOCK_DELETE) {
		deleteVariable(e.blockId);
	}
	if (e.type === Blockly.Events.BLOCK_CHANGE && block.type === 'VARIABLES_INIT_GLOBAL') {
		let newVariableName = block.getFieldValue('VAR_NAME');
		updateVariable(e.blockId, newVariableName);
	}
	if (e.type === Blockly.Events.BLOCK_CREATE && block.type === 'VARIABLES_GET') {
		updateGetBlock(block, workspace);
	}
	if (e.type === Blockly.Events.BLOCK_CREATE && block.type === 'VARIABLES_SET') {
		updateSetBlock(block, workspace);
	}
});
