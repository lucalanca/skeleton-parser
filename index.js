'use strict';

const globby = require('globby');

const defaults = require('lodash.defaults');
const moduleParser = require('./module-parser');

function processmodulesArray(modules) {
	return modules.reduce((acc, cur) => {
		const transformedCurrent = {
			[cur.id]: cur.toJson()
		};
		return Object.assign(
			{},
			acc,
			transformedCurrent
		);
	}, {});
}

const DEFAULT_OPTIONS = {
	folders: ['elements', 'modules']
};

module.exports = function (root, options) {
	options = defaults({}, options, DEFAULT_OPTIONS);
	const globbyPattern = options.folders.map(f => `${f}/*`);
	const globbyOptions = {cwd: `${root}/src`};
	return globby(globbyPattern, globbyOptions)
		.then(paths => {
			return paths.map(p => {
				return moduleParser.create(p, `${globbyOptions.cwd}/${p}`);
			});
		})
		.then(allModulesPromise => Promise.all(allModulesPromise))
		.then(processmodulesArray)
		;
};
