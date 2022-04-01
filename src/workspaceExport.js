function svgToPng_(data, width, height, callback) {
	let canvas = document.createElement('canvas');
	let context = canvas.getContext('2d');
	let img = new Image();

	let pixelDensity = 10;
	canvas.width = width * pixelDensity;
	canvas.height = height * pixelDensity;
	img.onload = function () {
		context.drawImage(
			img,
			0,
			0,
			width,
			height,
			0,
			0,
			canvas.width,
			canvas.height
		);
		try {
			let dataUri = canvas.toDataURL('image/png');
			callback(dataUri);
		} catch (err) {
			console.warn('Error converting the workspace svg to a png');
			callback('');
		}
	};
	img.src = data;
}

function workspaceToSvg_(workspace, callback, customCss) {
	let textAreas = document.getElementsByTagName('textarea');
	for (let i = 0; i < textAreas.length; i++) {
		textAreas[i].innerHTML = textAreas[i].value;
	}

	let bBox = workspace.getBlocksBoundingBox();
	let x = bBox.x || bBox.left;
	let y = bBox.y || bBox.top;
	let width = bBox.width || bBox.right - x;
	let height = bBox.height || bBox.bottom - y;

	let blockCanvas = workspace.getCanvas();
	let clone = blockCanvas.cloneNode(true);
	clone.removeAttribute('transform');

	let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
	svg.appendChild(clone);
	svg.setAttribute('viewBox', x + ' ' + y + ' ' + width + ' ' + height);

	svg.setAttribute(
		'class',
		'blocklySvg ' +
			(workspace.options.renderer || 'geras') +
			'-renderer ' +
			(workspace.getTheme ? workspace.getTheme().name + '-theme' : '')
	);
	svg.setAttribute('width', width);
	svg.setAttribute('height', height);
	svg.setAttribute('style', 'background-color: transparent');

	let css = [].slice
		.call(document.head.querySelectorAll('style'))
		.filter(function (el) {
			return (
				/\.blocklySvg/.test(el.innerText) || el.id.indexOf('blockly-') === 0
			);
		})
		.map(function (el) {
			return el.innerText;
		})
		.join('\n');
	let style = document.createElement('style');
	style.innerHTML = css + '\n' + customCss;
	svg.insertBefore(style, svg.firstChild);

	let svgAsXML = new XMLSerializer().serializeToString(svg);
	svgAsXML = svgAsXML.replace(/&nbsp/g, '&#160');
	let data = 'data:image/svg+xml,' + encodeURIComponent(svgAsXML);

	svgToPng_(data, width, height, callback);
}

Blockly.Workspace.prototype.exportWorkspacePNG = function () {
	workspaceToSvg_(this, function (datauri) {
		let a = document.createElement('a');
		a.download = 'screenshot.png';
		a.target = '_self';
		a.href = datauri;
		document.body.appendChild(a);
		a.click();
		a.parentNode.removeChild(a);
	});
};
