/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the block definition of bitwise operators.
 */

Blockly.Blocks['BITWISE_OPERATORS'] = {
	category: Blockly.CATEGORY_BITWISE_OPERATORS,
	init: function () {
		this.options = [
			['&', 'AND'],
			['|', 'OR'],
			['~', 'NOT'],
			['^', 'XOR'],
			['<<', 'LS'],
			['>>', 'RS'],
			['>>>', 'URS'],
		];
		this.appendValueInput('INPUT0').setCheck(
			this.bairnTypeToBlockType('number', 'INPUT')
		);
		this.appendDummyInput().appendField(
			new Blockly.FieldDropdown(this.options, this.validate.bind(this)),
			'OP'
		);
		this.appendValueInput('INPUT1').setCheck(
			this.bairnTypeToBlockType('number', 'INPUT')
		);
		this.setInputsInline(true);
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.BITWISE_OPERATORS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
		this.validate(this.getFieldValue('OP'));
	},
	validate: function (value) {
		this.getInput('INPUT0').setVisible(false);
		this.getInput('INPUT1').setVisible(false);
		if (value === 'NOT') {
			this.getInput('INPUT1').setVisible(true);
		} else {
			this.getInput('INPUT0').setVisible(true);
			this.getInput('INPUT1').setVisible(true);
    }
    this.render();
	},
	typeBlocking: [
		{
			key: 'bitwise and',
			blockType: 'BITWISE_OPERATORS',
			fieldValues: { OP: 'AND' },
		},
		{
			key: 'bitwise or',
			blockType: 'BITWISE_OPERATORS',
			fieldValues: { OP: 'OR' },
		},
		{
			key: 'bitwise not',
			blockType: 'BITWISE_OPERATORS',
			fieldValues: { OP: 'NOT' },
		},
		{
			key: 'bitwise xor',
			blockType: 'BITWISE_OPERATORS',
			fieldValues: { OP: 'XOR' },
		},
		{
			key: 'bitwise left sift',
			blockType: 'BITWISE_OPERATORS',
			fieldValues: { OP: 'LS' },
		},
		{
			key: 'bitwise right sift',
			blockType: 'BITWISE_OPERATORS',
			fieldValues: { OP: 'RS' },
		},
		{
			key: 'unsigned right sift',
			blockType: 'BITWISE_OPERATORS',
			fieldValues: { OP: 'URS' },
		},
	],
};
