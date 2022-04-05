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
		weight: 5,
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
		weight: 6,
	},

	{
		displayText: 'Create Comment',
		preconditionFn: function (scope) {
			if (scope.block.comment === null) {
				this.displayText = 'Create Comment';
			} else {
				this.displayText = 'Delete Comment';
			}
			if (scope.block.isInFlyout || scope.block.isInMutator) {
				return 'hidden';
			} else {
				return 'enabled';
			}
		},
		callback: function (scope) {
			if (scope.block.comment === null) {
				scope.block.setCommentText('--**Your Comment**--');
				scope.block.comment.setVisible(true);
			} else {
				scope.block.setCommentText(null);
			}
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
		id: 'handleBlockComment',
		weight: 0,
	},

	{
		displayText: 'Enable Block',
		preconditionFn: function (scope) {
			if (scope.block.isEnabled()) {
				this.displayText = 'Disable Block';
			} else {
				this.displayText = 'Enable Block';
			}
			if (scope.block.isInFlyout || scope.block.isInMutator) {
				return 'hidden';
			} else {
				return 'enabled';
			}
		},
		callback: function (scope) {
			if (scope.block.isEnabled()) {
				scope.block.setEnabled(false);
			} else {
				scope.block.setEnabled(true);
			}
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
		id: 'handleBlockEnabled',
		weight: 1,
	},

	{
		displayText: 'Delete Block',
		preconditionFn: function (scope) {
			if (scope.block.isInFlyout || scope.block.isInMutator) {
				return 'hidden';
			} else {
				return 'enabled';
			}
		},
		callback: function (scope) {
			scope.block.dispose(true, true);
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
		id: 'handleBlockDelete',
		weight: 2,
	},

	{
		displayText: 'Hide Warning',
		preconditionFn: function (scope) {
			if (scope.block.isInFlyout || scope.block.isInMutator || scope.block.warning === null) {
				return 'hidden';
			} else {
				return 'enabled';
			}
		},
		callback: function (scope) {
			scope.block.setWarningText(null);
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
		id: 'handleBlockWarning',
		weight: 3,
	},

	{
		displayText: 'Collapse',
		preconditionFn: function (scope) {
			if (scope.block.isCollapsed()) {
				this.displayText = 'Expand';
			} else {
				this.displayText = 'Collapse';
			}
			if (scope.block.isInFlyout || scope.block.isInMutator) {
				return 'hidden';
			} else {
				return 'enabled';
			}
		},
		callback: function (scope) {
			if (scope.block.isCollapsed()) {
				scope.block.setCollapsed(false);
			} else {
				scope.block.setCollapsed(true);
			}
		},
		scopeType: Blockly.ContextMenuRegistry.ScopeType.BLOCK,
		id: 'handleBlockCollapse',
		weight: 4,
	},
];

let actions = Blockly.ContextMenuRegistry.registry.registry_;
Object.keys(actions).forEach((action) => {
	Blockly.ContextMenuRegistry.registry.unregister(action);
});

BAIRN_ACTIONS.forEach((action) => {
	Blockly.ContextMenuRegistry.registry.register(action);
});
