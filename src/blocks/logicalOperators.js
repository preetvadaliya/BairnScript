Blockly.Blocks['LOGIC_BOOLEAN'] = {
	category: Blockly.CATEGORY_LOGIC,
	init: function () {
		this.options = [
			['true', 'T'],
			['false', 'F'],
		];
		this.appendDummyInput().appendField(
			new Blockly.FieldDropdown(this.options),
			'OP'
		);
		this.setOutput(true, this.bairnTypeToBlockType('boolean', 'OUTPUT'));
		this.setColour(Blockly.LOGIC_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'true',
			blockType: 'LOGIC_BOOLEAN',
			fieldValues: { OP: 'T' },
		},
		{
			key: 'false',
			blockType: 'LOGIC_BOOLEAN',
			fieldValues: { OP: 'F' },
		},
	],
};

Blockly.Blocks['LOGIC_NOT'] = {
	category: Blockly.CATEGORY_LOGIC,
	init: function () {
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('boolean', 'INPUT'))
			.appendField('not');
		this.setOutput(true, this.bairnTypeToBlockType('boolean', 'OUTPUT'));
		this.setColour(Blockly.LOGIC_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'not',
			blockType: 'LOGIC_NOT',
			fieldValues: {},
		},
	],
};

Blockly.Blocks['LOGIC_EQUAL_NOT_EQUAL'] = {
	category: Blockly.CATEGORY_LOGIC,
	init: function () {
		this.options = [
			['=', 'EQ'],
			['≠', 'NEQ'],
		];
		this.appendValueInput('INPUT0').setCheck(
			this.bairnTypeToBlockType('boolean', 'INPUT')
		);
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.appendValueInput('INPUT1').setCheck(
			this.bairnTypeToBlockType('boolean', 'INPUT')
		);
		this.setInputsInline(true);
		this.setOutput(true, this.bairnTypeToBlockType('boolean', 'OUTPUT'));
		this.setColour(Blockly.LOGIC_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'equal',
			blockType: 'LOGIC_EQUAL_NOT_EQUAL',
			fieldValues: { OP: 'EQ' },
		},
		{
			key: 'not equal',
			blockType: 'LOGIC_EQUAL_NOT_EQUAL',
			fieldValues: { OP: 'NEQ' },
		},
	],
};
