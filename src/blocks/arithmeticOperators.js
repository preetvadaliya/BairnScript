/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the block definition of arithmetic operators.
 */

Blockly.Blocks['ARITHMETIC_OPERATORS'] = {
	category: Blockly.CATEGORY_ARITHMETIC_OPERATORS,
	init: function () {
		this.options = [
			['+', 'ADD'],
			['-', 'SUB'],
			['×', 'MUL'],
			['÷', 'DIV'],
			['%', 'MOD'],
			['++i', 'PRI'],
			['i++', 'POI'],
			['--i', 'PRD'],
			['i--', 'POD'],
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
		this.setColour(Blockly.ARITHMETIC_OPERATORS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
		this.validate(this.getFieldValue('OP'));
	},
	validate: function (value) {
		this.getInput('INPUT0').setVisible(false);
		this.getInput('INPUT1').setVisible(false);
		if (value !== 'PRI' || value !== 'PRD') {
			this.getInput('INPUT0').setVisible(true);
		} else if (value === 'POI' || value === 'POD') {
			this.getInput('INPUT1').setVisible(true);
		} else {
			this.getInput('INPUT0').setVisible(true);
			this.getInput('INPUT1').setVisible(true);
		}
		this.render();
	},
	typeBlocking: [
		{
			key: 'addison',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'ADD' },
		},
		{
			key: 'subtraction',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'SUB' },
		},
		{
			key: 'multiplication',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'MUL' },
		},
		{
			key: 'division',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'DIV' },
		},
		{
			key: 'modulo',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'MOD' },
		},
		{
			key: 'pre increment',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'PRI' },
		},
		{
			key: 'post increment',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'POI' },
		},
		{
			key: 'pre decrement',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'PRD' },
		},
		{
			key: 'post decrement',
			blockType: 'ARITHMETIC_OPERATORS',
			fieldValues: { OP: 'POD' },
		},
	],
};
