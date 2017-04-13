const fs = require('fs');
const fsp = require('fs-promise');
const isArray = require('lodash.isarray');
const parseFile = require('./parsers');
const enhanceTree = require('./enhancers');

const arrayToObject = arr => arr.reduce((acc, curr) => Object.assign({}, acc, curr), {});

function parseLayerEntry(name, layerPath) {
	return fsp.readdir(`${layerPath}/${name}`)
		.then(files => Promise.all(
			files
				.map(f => parseFile(`${layerPath}/${name}/${f}`))
		))
		.then(filesData => filesData.reduce((acc, curr) => {
			const type = curr.type;
			const data = curr.data;
			const currentTypeData = acc[type];
			let nextTypeData;
			if (currentTypeData === undefined) {
				nextTypeData = data;
			} else if (isArray(currentTypeData)) {
				nextTypeData = currentTypeData.concat(data);
			} else {
				nextTypeData = [currentTypeData].concat(data);
			}
			return Object.assign({}, acc, {
				[type]: nextTypeData
			});
		}, {}))
		.then(moduleData => ({[name]: moduleData}));
}

function parseLayer(layer, layerPath) {
	if (!fs.statSync(layerPath, layer).isDirectory()) {
		return Promise.resolve(false);
	}

	if (layer === 'pages') {
		return Promise.resolve(false);
	}

	return fsp.readdir(layerPath)
		.then(entries => Promise.all(entries.map(entry => parseLayerEntry(entry, layerPath))))
		.then(arrayToObject)
		.then(entriesData => ({[layer]: entriesData}));
}

module.exports = baseFolder => {
	return fsp.readdir(baseFolder)
		.then(layers => Promise.all(layers.map(layer => parseLayer(layer, baseFolder + '/' + layer))))
		.then(layersData => layersData.filter(Boolean))
		.then(arrayToObject)
		.then(enhanceTree)
		;
};
