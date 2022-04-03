/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the block definition of variables.
 */

Blockly.Blocks['VARIABLES_INIT_GLOBAL'] = {
	category: Blockly.CATEGORY_VARIABLES,
	init: function () {
		this.appendValueInput('INPUT0')
			.setCheck(null)
			.appendField('initialize global')
			.appendField(new Blockly.FieldTextInput('name'), 'VAR_NAME')
			.appendField('to');
		this.setColour(Blockly.VARIABLES_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	validate: function (value) {
		if (value.match(Blockly.VALID_IDENTIFIER)) {
			let variables = Object.values(this.workspace.variableDB);
			if (!variables.includes(value)) {
				console.log(value);
				this.workspace.variableDB[this.id] = value;
				return value;
			} else {
				this.workspace.variableDB[this.id] = this.getFieldValue('VAR_NAME');
				return null;
			}
		} else {
			return null;
		}
	},
	typeBlocking: [
		{
			key: 'initialize global variable',
			blockType: 'VARIABLES_INIT_GLOBAL',
			fieldValues: {},
		},
	],
};

Blockly.Blocks['VARIABLES_GET'] = {
	category: Blockly.CATEGORY_VARIABLES,
	init: function () {
		this.variableList = [['name', 'name']];
		this.appendDummyInput()
			.appendField('get')
			.appendField(new Blockly.FieldDropdown(this.variableList), 'VAR_LIST');
		this.setOutput(true, null);
		this.setColour(Blockly.VARIABLES_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
		this.setOnChange(this.updateVariableDD.bind(this));
	},
  updateVariableDD: function (e) {
    if (e instanceof Blockly.Events.BlockBase) {
			this.variableList.splice(0, this.variableList.length);
			Object.keys(this.workspace.variableDB).forEach((key) => {
				this.variableList.push([
					this.workspace.variableDB[key],
					key,
				]);
      });
      this.markDirty();
    }
	},
	typeBlocking: [
		{
			key: 'get global variable',
			blockType: 'VARIABLES_GET_GLOBAL',
			fieldValues: {},
		},
	],
};
