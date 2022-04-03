Blockly.Workspace.prototype.variableDB = {};

function createVariable(workspace, block) {
	let fieldValue = block.getFieldValue('VAR_NAME');
	let variables = Object.values(workspace.variableDB);
	if (variables.includes(fieldValue)) {
		let i = 1;
		while (true) {
			if (variables.includes(fieldValue + i)) {
				i++;
			} else {
				break;
			}
		}
		workspace.variableDB[block.id] = fieldValue + i;
		block.setFieldValue(fieldValue + i, 'VAR_NAME');
	} else {
		workspace.variableDB[block.id] = fieldValue;
		block.setFieldValue(fieldValue, 'VAR_NAME');
	}
  block.getField('VAR_NAME').setValidator(block.validate.bind(block));
}

function deleteVariable(workspace, id) {
	delete workspace.variableDB[id];
}

Blockly.getMainWorkspace().addChangeListener(function (e) {
	let workspace = Blockly.Workspace.getById(e.workspaceId);
	let block = e.blockId === null ? null : workspace.getBlockById(e.blockId);
	if (e instanceof Blockly.Events.BlockBase) {
		if (e.type === 'create' && block.type === 'VARIABLES_INIT_GLOBAL') {
			createVariable(workspace, block);
		}
    if (e.type === 'delete') {
			deleteVariable(workspace, e.blockId);
    }
	}
});
