/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the block definition of variables.
 */

Blockly.Blocks['VARIABLES_INIT_GLOBAL'] = {
	category: Blockly.CATEGORY_VARIABLES,
	init: function () {
		this.appendValueInput('NAME')
			.setCheck()
			.appendField('initialize global')
			.appendField(new Blockly.FieldTextInput('name'), 'VAR_NAME')
			.appendField('to');
		this.setColour(Blockly.VARIABLES_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	validate: function (value) {
		if (!value.match(Blockly.VALID_IDENTIFIER)) {
			return null;
		} else {
			if (this.workspace.getAllVariableNames().includes(value)) {
				return null;
			}
		}
	},
};

Blockly.Blocks['VARIABLES_GET'] = {
	category: Blockly.CATEGORY_VARIABLES,
	init: function () {
		this.appendDummyInput('VAR_DD')
			.appendField('get')
			.appendField(new Blockly.FieldDropdown([['name', 'name']]), 'OP');
		this.setOutput(true, null);
		this.setColour(Blockly.VARIABLES_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
};

Blockly.Blocks['VARIABLES_SET'] = {
	category: Blockly.CATEGORY_VARIABLES,
	init: function () {
		this.appendValueInput('VAR_DD')
			.setCheck(null)
			.appendField('set')
			.appendField(new Blockly.FieldDropdown([['name', 'name']]), 'OP')
			.appendField('to');
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setColour(Blockly.VARIABLES_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
};
