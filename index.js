'use strict';

const globby = require('globby');
const merge = require('lodash.merge');
const moduleParser = require('./module-parser');

const DEFAULT_OPTIONS = {
	cwd: 'src',
	folders: ['elements', 'modules']
};

module.exports = function (opts) {
	opts = opts || {};
	opts.cwd = opts.cwd || DEFAULT_OPTIONS.cwd;
	opts.folders = opts.folders || DEFAULT_OPTIONS.folders;

	const globbyPattern = opts.folders.map(folder => `${folder}/*`);
	const globbyOptions = {cwd: `${opts.cwd}/src`};

	return globby(globbyPattern, globbyOptions).then(
		paths => {
			return paths.map(p => {
				return moduleParser(p, `${globbyOptions.cwd}`);
			});
		})
	.then(allModulesPromise => Promise.all(allModulesPromise))
	.then(mergeArrayOfObjects);
};

function mergeArrayOfObjects(modules) {
	return modules.reduce((acc, cur) => merge(acc, cur));
}
