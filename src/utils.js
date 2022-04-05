Blockly.Block.prototype.bairnType = {
	number: {
		INPUT: ['number'],
		OUTPUT: ['number', 'string'],
	},
	boolean: {
		INPUT: ['boolean'],
		OUTPUT: ['boolean', 'string'],
	},
};

Blockly.Block.prototype.bairnTypeToBlockType = function (type, option) {
	return this.bairnType[type][option];
};
