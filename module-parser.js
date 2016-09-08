'use strict';

const moduleHelper = require('./module-helper');

function trimObject(json) {
	for (const i in json) {
		if (json[i] === null || json[i] === undefined) {
			delete json[i];
		}
	}
	return json;
}

const FILE_TYPES = [
	'template', 'definition', 'documentation',
	'script', 'style'
];

const PARSER_BY_FILE_TYPE = {
	template: moduleHelper.parseTemplate,
	definition: moduleHelper.parseDefinition,
	documentation: moduleHelper.parseDocumentation,
	script: moduleHelper.parseScript,
	style: moduleHelper.parseStyle
};

module.exports = (modulePath, cwd) => {
	const name = moduleHelper.extractName(modulePath);
	const group = moduleHelper.extractGroup(modulePath);

	const filetypeParsersPromise = FILE_TYPES
		.map(filetype => PARSER_BY_FILE_TYPE[filetype](modulePath, cwd));

	// wait for all promise of all filetypes to be completed
	return Promise.all(filetypeParsersPromise)
		// convert them to an object
		.then(attributesResult => {
			return FILE_TYPES.reduce((acc, curr, currIdx) => {
				return Object.assign(
					{},
					acc,
					{[curr]: attributesResult[currIdx]}
				);
			}, {});
		})
		// add path
		.then(moduleJson => {
			return Object.assign(
				{},
				moduleJson,
				{path: moduleHelper.buildPath(modulePath, cwd)}
			);
		})
		.then(moduleJson => {
			return {
				[group]: {
					[name]: trimObject(moduleJson)
				}
			};
		});
};
