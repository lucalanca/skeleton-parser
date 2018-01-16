'use strict';

var path = require('path');
var fsp = require('fs-promise');
var yaml = require('js-yaml');

var TYPE_ENTRY_POINTS = {
	TEMPATE: 'template.jade',
	STYLE: 'style.scss',
	SCRIPT: 'script.js',
	DOC: 'docs.spec.jade',
	DEFINITION: 'definition.yml',
	DEFINITION_JS: 'definition.js'
};

function checkFiletypeExists(filename, modulePath, cwd) {
	var searchedFile = path.join(cwd, modulePath, filename);
	return fsp.exists(searchedFile).then(function (exists) {
		if (exists) {
			return filename;
		}
	});
}

function readFile(cwd, modulePath, file) {
	if (file) {
		var absolutePath = path.resolve(cwd, modulePath, file);
		return fsp.readFile(absolutePath, { encoding: 'utf8' });
	}
	return;
}

module.exports = {
	extractGroup: function extractGroup(modulePath) {
		return path.dirname(modulePath);
	},
	extractName: function extractName(modulePath) {
		return path.basename(modulePath);
	},
	buildPath: function buildPath(modulePath, cwd) {
		return path.join(cwd, modulePath);
	},
	parseScript: function parseScript(modulePath, cwd) {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.SCRIPT, modulePath, cwd);
	},
	parseStyle: function parseStyle(modulePath, cwd) {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.STYLE, modulePath, cwd);
	},
	parseTemplate: function parseTemplate(modulePath, cwd) {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.TEMPATE, modulePath, cwd);
	},
	parseDocumentation: function parseDocumentation(modulePath, cwd) {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DOC, modulePath, cwd);
	},
	parseDefinition: function parseDefinition(modulePath, cwd) {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DEFINITION, modulePath, cwd).then(function (definitionFile) {
			return readFile(cwd, modulePath, definitionFile);
		}).then(function (content) {
			return content ? yaml.load(content) : undefined;
		}).catch(function (err) {
			return console.log(modulePath, err);
		});
	},
	parseDefinitionJs: function parseDefinitionJs(modulePath, cwd) {
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DEFINITION_JS, modulePath, cwd).then(function (definitionJsFile) {
			return definitionJsFile ? require(path.resolve(cwd, modulePath, definitionJsFile)) : undefined;
		}).catch(function (err) {
			return console.log(modulePath, err);
		});
	}
};