/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the block definition of type operators.
 */

Blockly.Blocks['TYPE_OPERATORS'] = {
	category: Blockly.CATEGORY_TYPE_OPERATORS,
	init: function () {
		this.options = [
			['typeof', 'TYPE_OF'],
			['instanceof', 'INSTANCE_OF'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(null)
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, null);
		this.setColour(Blockly.TYPE_OPERATORS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'typeof',
			blockType: 'TYPE_OPERATORS',
			fieldValues: { OP: 'TYPE_OF' },
		},
		{
			key: 'instanceof',
			blockType: 'TYPE_OPERATORS',
			fieldValues: { OP: 'INSTANCE_OF' },
		},
	],
};
