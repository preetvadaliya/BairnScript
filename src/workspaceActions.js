/**
 * @fileoverview
 * The type blocking logic of the bairnscript system.
 * This feature let you create a block inside the workspace by just typing on keyboard,
 * make sure workspace is in focus mode.
 * @author Preet P. Vadaliya
 */

Blockly.Workspace.prototype.scopeOnlyWorkspace = function () {
	if (this.isMutator || this.isFlyout) {
		return 'hidden';
	} else {
		return this.topBlocks_.length > 0 ? 'enabled' : 'disabled';
	}
};

const BAIRN_ACTIONS = [
	{
		displayText: 'Arrange All Blocks',
		preconditionFn: function (scope) {
			return scope.workspace.scopeOnlyWorkspace();
		},
		callback: function (scope) {
			scope.workspace.cleanUp();
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
		id: 'handleCleanUp',
		weight: 0,
	},

	{
		displayText: 'Arrange All Blocks by Category',
		preconditionFn: function (scope) {
			return scope.workspace.scopeOnlyWorkspace();
		},
		callback: function (scope) {
			let topBlocks = [].concat(scope.workspace.topBlocks_);
			let blockMap = {};
			Array.from(topBlocks).forEach((block) => {
				if (block.category in blockMap) {
					blockMap[block.category].push({
						xml: Blockly.Xml.blockToDom(block, true),
						comment: block.getCommentText(),
						warning: block.warning,
					});
				} else {
					blockMap[block.category] = [
						{
							xml: Blockly.Xml.blockToDom(block, true),
							comment: block.getCommentText(),
							warning: block.warning,
						},
					];
				}
			});
			scope.workspace.clear();
			Object.keys(blockMap).forEach((category) => {
				Array.from(blockMap[category]).forEach((block) => {
					let newBlock = Blockly.Xml.domToBlock(block.xml, scope.workspace);
					newBlock.setCommentText(block.comment);
					newBlock.setWarningText(block.warning);
				});
			});
			workspace.cleanUp();
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
		id: 'handleCleanUpByCategory',
		weight: 1,
	},

	{
		displayText: 'Undo',
		preconditionFn: function (scope) {
			return scope.workspace.scopeOnlyWorkspace();
		},
		callback: function (scope) {
			scope.workspace.undo(!1);
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
		id: 'handleUndo',
		weight: 2,
	},

	{
		displayText: 'Redo',
		preconditionFn: function (scope) {
			return scope.workspace.scopeOnlyWorkspace();
		},
		callback: function (scope) {
			scope.workspace.undo(!0);
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
		id: 'handleRedo',
		weight: 3,
	},

	{
		displayText: 'Delete All blocks',
		preconditionFn: function (scope) {
			return scope.workspace.scopeOnlyWorkspace();
		},
		callback: function (scope) {
			scope.workspace.clear();
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
		id: 'handleDelete',
		weight: 4,
	},

	{
		displayText: 'Export Workspace PNG',
		preconditionFn: function (scope) {
			return scope.workspace.scopeOnlyWorkspace();
		},
		callback: function (scope) {
			scope.workspace.exportWorkspacePNG();
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.WORKSPACE,
		id: 'handleExportWorkspacePNG',
		weight: 5,
	},
];

let actions = Blockly.ContextMenuRegistry.registry.registry_;
Object.keys(actions).forEach((action) => {
	Blockly.ContextMenuRegistry.registry.unregister(action);
});

BAIRN_ACTIONS.forEach((action) => {
	Blockly.ContextMenuRegistry.registry.register(action);
});
