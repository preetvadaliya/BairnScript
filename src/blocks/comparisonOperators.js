/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the block definition of comparison operators.
 */

Blockly.Blocks['COMPARISON_OPERATORS'] = {
	category: Blockly.CATEGORY_COMPARISON_OPERATORS,
	init: function () {
		this.options = [
			['=', 'EQT'],
			['≡', 'T_EQT'],
			['≠', 'N_EQT'],
			['≢', 'N_T_EQT'],
			['<', 'LESS'],
			['≤', 'LESS_EQT'],
			['>', 'GREAT'],
			['≥', 'GREAT_EQT'],
			['?', 'TERN'],
		];
		this.appendValueInput('INPUT0').setCheck(null);
		this.appendDummyInput().appendField(
			new Blockly.FieldDropdown(this.options, this.validate.bind(this)),
			'OP'
		);
		this.appendValueInput('INPUT1').setCheck(null);
		this.appendValueInput('INPUT2').setCheck(null).appendField(':');
		this.setInputsInline(true);
		this.setOutput(true, this.bairnTypeToBlockType('boolean', 'OUTPUT'));
		this.setColour(Blockly.COMPARISON_OPERATORS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
		this.validate(this.getFieldValue('OP'));
	},
	validate: function (value) {
		this.getInput('INPUT0').setVisible(false);
		this.getInput('INPUT1').setVisible(false);
		this.getInput('INPUT2').setVisible(false);
		if (value === 'TERN') {
			this.getInput('INPUT0').setVisible(true);
			this.getInput('INPUT1').setVisible(true);
			this.getInput('INPUT2').setVisible(true);
			this.getInput('INPUT0').setCheck(
				this.bairnTypeToBlockType('boolean', 'INPUT')
			);
		} else {
			this.getInput('INPUT0').setVisible(true);
			this.getInput('INPUT1').setVisible(true);
			this.getInput('INPUT0').setCheck(null);
		}
		this.render();
	},
	typeBlocking: [
		{
			key: 'equal to',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'EQT' },
		},
		{
			key: 'not equal to',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'T_EQT' },
		},
		{
			key: 'equal value and equal type',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'N_EQT' },
		},
		{
			key: 'not equal value or not equal type',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'N_T_EQT' },
		},
		{
			key: 'lesser than',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'LESS' },
		},
		{
			key: 'lesser than or equal to',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'LESS_EQT' },
		},
		{
			key: 'greater than',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'GREAT' },
		},
		{
			key: 'greater than or equal to',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'GREAT_EQT' },
		},
		{
			key: 'ternary',
			blockType: 'COMPARISON_OPERATORS',
			fieldValues: { OP: 'TERN' },
		},
	],
};
