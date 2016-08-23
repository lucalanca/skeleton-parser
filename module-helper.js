'use strict';

const path = require('path');
const fsp = require('fs-promise');
const yaml = require('js-yaml');

const TYPE_ENTRY_POINTS = {
	TEMPATE: 'template.jade',
	STYLE: 'style.scss',
	SCRIPT: 'script.js',
	DOC: 'docs.spec.jade',
	DEFINITION: 'definition.yml'
};

function checkFiletypeExists(filename, modulePath, cwd) {
	const searchedFile = path.join(cwd, modulePath, filename);
	return fsp.exists(searchedFile).then(function (exists) {
	  if (exists) {
	  	return filename;
	  }
	});
}

module.exports = {
	extractGroup: function(modulePath){
		return path.dirname(modulePath);
	},
	extractName: function(modulePath){
		return path.basename(modulePath);
	},
	buildPath: function(modulePath, cwd){
		return path.join(cwd, modulePath);
	},
	parseScript: function(modulePath, cwd){
		return checkFiletypeExists(TYPE_ENTRY_POINTS.SCRIPT, modulePath, cwd);
	},
	parseStyle: function(modulePath, cwd){
		return checkFiletypeExists(TYPE_ENTRY_POINTS.STYLE, modulePath, cwd);
	},
	parseTemplate: function(modulePath, cwd){
		return checkFiletypeExists(TYPE_ENTRY_POINTS.TEMPATE, modulePath, cwd);
	},
	parseDocumentation: function(modulePath, cwd){
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DOC, modulePath, cwd);
	},
	parseDefinition: function(modulePath, cwd){
		return checkFiletypeExists(TYPE_ENTRY_POINTS.DEFINITION, modulePath, cwd).then(
			definitionFile => {
				if (definitionFile != undefined) {
					const absolutePath = path.resolve(cwd, modulePath, definitionFile);
					return fsp.readFile(absolutePath, {encoding: 'utf8'}).then(
						yaml.load
					);
				}
			}
		);
	}
};
