'use strict';

const moduleHelper = require('./module-helper');

function trimObject(json) {
	for (var i in json) {
	  if (json[i] === null || json[i] === undefined) {
	    delete json[i];
	  }
	}
	return json;
}

module.exports = function(modulePath, cwd) {
	const name = moduleHelper.extractName(modulePath);
	const group = moduleHelper.extractGroup(modulePath);

	const moduleJSON = {
		template: moduleHelper.parseTemplate,
		definition: moduleHelper.parseDefinition,
		documentation: moduleHelper.parseDocumentation,
		script: moduleHelper.parseScript,
		style: moduleHelper.parseStyle
	}

	const attibutesPromises = Object.keys(moduleJSON).map( key => {
		return moduleJSON[key](modulePath, cwd).then( value => {
			moduleJSON[key] = value;
		});
	})

	return Promise.all(attibutesPromises).then( () => {
		moduleJSON.path = moduleHelper.buildPath(modulePath, cwd);

		return  {
			[group]: {
				[name]: trimObject(moduleJSON)
			}
		};
	});
}
