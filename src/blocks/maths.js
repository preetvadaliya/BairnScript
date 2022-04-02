/**
 * @author Preet P. Vadaliya
 * @fileoverview This file contains the block definition of Math object.
 */

Blockly.Blocks['MATHS_NUMBER'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.appendDummyInput()
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField(new Blockly.FieldNumber(0), 'INPUT0');
		this.setInputsInline(true);
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
};

Blockly.Blocks['MATHS_RADIX_NUMBER'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['binary', 'BIN'],
			['octal', 'OCT'],
			['decimal', 'DEC'],
			['hexadecimal', 'HEX'],
			['custom', 'CUS'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(
				new Blockly.FieldDropdown(this.options, this.validate.bind(this)),
				'OP'
			);
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
		this.validate(this.getFieldValue('OP'));
	},
	validate: function (value) {
		this.getInput('INPUT0').removeField('BASE_TITLE', true);
		this.getInput('INPUT0').removeField('BASE', true);
		if (value === 'CUS') {
			this.getInput('INPUT0')
				.appendField('base', 'BASE_TITLE')
				.appendField(new Blockly.FieldNumber(22), 'BASE');
		}
	},
	typeBlocking: [
		{
			key: 'binary',
			blockType: 'MATHS_RADIX_NUMBER',
			fieldValues: { OP: 'BIN' },
		},
		{
			key: 'octal',
			blockType: 'MATHS_RADIX_NUMBER',
			fieldValues: { OP: 'OCT' },
		},
		{
			key: 'decimal',
			blockType: 'MATHS_RADIX_NUMBER',
			fieldValues: { OP: 'DEC' },
		},
		{
			key: 'hexadecimal',
			blockType: 'MATHS_RADIX_NUMBER',
			fieldValues: { OP: 'HEX' },
		},
		{
			key: 'custom radix number',
			blockType: 'MATHS_RADIX_NUMBER',
			fieldValues: { OP: 'CUS' },
		},
	],
};

Blockly.Blocks['MATHS_CONSTANTS'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['π', 'PI'],
			['ℯ', 'E'],
			['√2', 'SQ_2'],
			['√0.5', 'SQ_1_2'],
			['ln(2)', 'LN_2'],
			['ln(10)', 'LN_10'],
			['log₂(e)', 'LOG2E'],
			['log₁₀(e)', 'LOG10E'],
		];
		this.appendDummyInput().appendField(
			new Blockly.FieldDropdown(this.options),
			'OP'
		);
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'pi',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'PI' },
		},
		{
			key: 'epsilon',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'E' },
		},
		{
			key: 'square root of 2',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'SQ_2' },
		},
		{
			key: 'square root of 0.5',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'SQ_1_2' },
		},
		{
			key: 'ln 2',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'LN_2' },
		},
		{
			key: 'ln 10',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'LN_10' },
		},
		{
			key: 'log e base 2',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'LOG2E' },
		},
		{
			key: 'log e base 10',
			blockType: 'MATHS_CONSTANTS',
			fieldValues: { OP: 'LOG10E' },
		},
	],
};

Blockly.Blocks['MATHS_NUMBER_TO_INTEGER'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['round', 'ROUND'],
			['ceil', 'CEIL'],
			['floor', 'FLOOR'],
			['trunc', 'TRUNC'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'round',
			blockType: 'MATHS_NUMBER_TO_INTEGER',
			fieldValues: { OP: 'ROUND' },
		},
		{
			key: 'ceiling',
			blockType: 'MATHS_NUMBER_TO_INTEGER',
			fieldValues: { OP: 'CEIL' },
		},
		{
			key: 'floor',
			blockType: 'MATHS_NUMBER_TO_INTEGER',
			fieldValues: { OP: 'FLOOR' },
		},
		{
			key: 'trunc',
			blockType: 'MATHS_NUMBER_TO_INTEGER',
			fieldValues: { OP: 'TRUNC' },
		},
	],
};

Blockly.Blocks['MATHS_TRIGONOMETRY'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['sin', 'SIN'],
			['cos', 'COS'],
			['tan', 'TAN'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'sin',
			blockType: 'MATHS_TRIGONOMETRY',
			fieldValues: { OP: 'SIN' },
		},
		{
			key: 'cos',
			blockType: 'MATHS_TRIGONOMETRY',
			fieldValues: { OP: 'COS' },
		},
		{
			key: 'tan',
			blockType: 'MATHS_TRIGONOMETRY',
			fieldValues: { OP: 'TAN' },
		},
	],
};

Blockly.Blocks['MATHS_HYPERBOLIC_TRIGONOMETRY'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['sinh', 'H_SIN'],
			['cosh', 'H_COS'],
			['tanh', 'H_TAN'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'sinh',
			blockType: 'MATHS_HYPERBOLIC_TRIGONOMETRY',
			fieldValues: { OP: 'H_SIN' },
		},
		{
			key: 'cosh',
			blockType: 'MATHS_HYPERBOLIC_TRIGONOMETRY',
			fieldValues: { OP: 'H_COS' },
		},
		{
			key: 'tanh',
			blockType: 'MATHS_HYPERBOLIC_TRIGONOMETRY',
			fieldValues: { OP: 'H_TAN' },
		},
	],
};

Blockly.Blocks['MATHS_ARC_TRIGONOMETRY'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['asin', 'A_SIN'],
			['acos', 'A_COS'],
			['atan', 'A_TAN'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'asin',
			blockType: 'MATHS_ARC_TRIGONOMETRY',
			fieldValues: { OP: 'A_SIN' },
		},
		{
			key: 'acos',
			blockType: 'MATHS_ARC_TRIGONOMETRY',
			fieldValues: { OP: 'A_COS' },
		},
		{
			key: 'atan',
			blockType: 'MATHS_ARC_TRIGONOMETRY',
			fieldValues: { OP: 'A_TAN' },
		},
	],
};

Blockly.Blocks['MATHS_ARC_HYPERBOLIC_TRIGONOMETRY'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['asinh', 'AH_SIN'],
			['acosh', 'AH_COS'],
			['atanh', 'AH_TAN'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'asinh',
			blockType: 'MATHS_ARC_HYPERBOLIC_TRIGONOMETRY',
			fieldValues: { OP: 'AH_SIN' },
		},
		{
			key: 'acosh',
			blockType: 'MATHS_ARC_HYPERBOLIC_TRIGONOMETRY',
			fieldValues: { OP: 'AH_COS' },
		},
		{
			key: 'atanh',
			blockType: 'MATHS_ARC_HYPERBOLIC_TRIGONOMETRY',
			fieldValues: { OP: 'AH_TAN' },
		},
	],
};

Blockly.Blocks['MATHS_ROOT'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['sqrt', 'SQRT'],
			['cbrt', 'CBRT'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'square root',
			blockType: 'MATHS_ROOT',
			fieldValues: { OP: 'SQRT' },
		},
		{
			key: 'cube root',
			blockType: 'MATHS_ROOT',
			fieldValues: { OP: 'CBRT' },
		},
	],
};

Blockly.Blocks['MATHS_EXP_LOG'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['exp', 'EXP'],
			['log', 'LOG'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'exp',
			blockType: 'MATHS_EXP_LOG',
			fieldValues: { OP: 'EXP' },
		},
		{
			key: 'log',
			blockType: 'MATHS_EXP_LOG',
			fieldValues: { OP: 'LOG' },
		},
	],
};

Blockly.Blocks['MATHS_SIGN_ABS'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['sign', 'SIGN'],
			['abs', 'ABS'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.appendField(new Blockly.FieldDropdown(this.options), 'OP');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
	typeBlocking: [
		{
			key: 'sign',
			blockType: 'MATHS_EXP_LOG',
			fieldValues: { OP: 'SIGN' },
		},
		{
			key: 'absolute',
			blockType: 'MATHS_EXP_LOG',
			fieldValues: { OP: 'ABS' },
		},
	],
};

Blockly.Blocks['MATHS_POW_ATAN2'] = {
	category: Blockly.CATEGORY_MATHS,
	init: function () {
		this.options = [
			['power', 'POW'],
			['atan2', 'ATAN2'],
		];
		this.appendValueInput('INPUT0')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField(
				new Blockly.FieldDropdown(this.options, this.validate.bind(this)),
				'OP'
			)
			.appendField('x', 'X');
		this.appendValueInput('INPUT1')
			.setCheck(this.bairnTypeToBlockType('number', 'INPUT'))
			.setAlign(Blockly.ALIGN_RIGHT)
			.appendField('y', 'Y');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
		this.validate(this.getFieldValue('OP'));
	},
	validate: function (value) {
		this.getInput('INPUT0').removeField('X', true);
		this.getInput('INPUT0').removeField('Y', true);
		this.getInput('INPUT1').removeField('X', true);
		this.getInput('INPUT1').removeField('Y', true);
		if (value === 'POW') {
			this.getInput('INPUT0').appendField('x', 'X');
			this.getInput('INPUT1').appendField('y', 'Y');
		} else {
			this.getInput('INPUT0').appendField('y', 'Y');
			this.getInput('INPUT1').appendField('x', 'X');
		}
	},
	typeBlocking: [
		{
			key: 'sign',
			blockType: 'MATHS_POW_ATAN2',
			fieldValues: { OP: 'POW' },
		},
		{
			key: 'absolute',
			blockType: 'MATHS_POW_ATAN2',
			fieldValues: { OP: 'ATAN2' },
		},
	],
};

Blockly.Blocks['MATHS_RANDOM_NUMBER'] = {
	init: function () {
		this.appendDummyInput().appendField('random number');
		this.setOutput(true, this.bairnTypeToBlockType('number', 'OUTPUT'));
		this.setColour(Blockly.MATHS_CATEGORY_HUE);
		this.setTooltip('');
		this.setHelpUrl('');
	},
};
