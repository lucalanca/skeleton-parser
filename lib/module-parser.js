'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pickBy = require('lodash.pickby');
var moduleHelper = require('./module-helper');

var FILE_TYPES = ['template', 'definition', 'documentation', 'script', 'style'];
var PARSER_BY_FILE_TYPE = {
	template: moduleHelper.parseTemplate,
	documentation: moduleHelper.parseDocumentation,
	definition: moduleHelper.parseDefinition,
	script: moduleHelper.parseScript,
	style: moduleHelper.parseStyle
};
module.exports = function (modulePath, cwd, yml) {
	if (!yml) {
		PARSER_BY_FILE_TYPE.definition = moduleHelper.parseDefinitionJs;
	}

	var name = moduleHelper.extractName(modulePath);
	var group = moduleHelper.extractGroup(modulePath);

	var filetypeParsersPromise = FILE_TYPES.map(function (filetype) {
		return PARSER_BY_FILE_TYPE[filetype](modulePath, cwd);
	});

	// wait for all promise of all filetypes to be completed
	return Promise.all(filetypeParsersPromise)
	// convert them to an object
	.then(function (attributesResult) {
		return FILE_TYPES.reduce(function (acc, curr, currIdx) {
			return Object.assign({}, acc, _defineProperty({}, curr, attributesResult[currIdx]));
		}, {});
	})
	// remove falsey values from obj
	.then(function (moduleObj) {
		return pickBy(moduleObj, Boolean);
	})
	// add path
	.then(function (moduleObj) {
		return Object.assign({}, moduleObj, {
			path: moduleHelper.buildPath(modulePath, cwd)
		});
	}).then(function (moduleObj) {
		return _defineProperty({}, group, _defineProperty({}, name, moduleObj));
	});
};