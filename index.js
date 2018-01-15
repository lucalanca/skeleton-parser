'use strict';
const path = require('path');
const globby = require('globby');
const merge = require('lodash.merge');
const moduleParser = require('./module-parser');

const DEFAULT_OPTIONS = {
	cwd: 'src',
	folders: ['elements', 'components'],
	yml: true // Default option to parse .yml files
};

module.exports = function (options = {}) {
	const opts = {...DEFAULT_OPTIONS, ...options};

	const globbyPattern = opts.folders.map(folder => `${folder}/*`);
	const globbyOptions = {cwd: path.resolve(`${opts.cwd}`)};

	return globby(globbyPattern, globbyOptions)
		.then(paths => {
			return paths.map(p => {
				return moduleParser(p, `${globbyOptions.cwd}`, opts.yml);
			});
		})
		.then(allModulesPromise => Promise.all(allModulesPromise))
		.then(mergeArrayOfObjects);
};

function mergeArrayOfObjects(modules) {
	return modules.reduce((acc, cur) => merge(acc, cur), {});
}
