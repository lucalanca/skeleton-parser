'use strict';

const path = require('path');
const globby = require('globby');
const _defaultsdeep = require('lodash.merge');
const moduleParser = require('./module-parser');

const DEFAULT_OPTIONS = {
	cwd: path.join(process.cwd(), 'src'),
	folders: ['elements', 'modules']
};

module.exports = function (opts) {
	opts = opts || {};
	opts.cwd = opts.cwd || DEFAULT_OPTIONS.cwd;
	opts.folders = opts.folders || DEFAULT_OPTIONS.folders;

	const globbyPattern = opts.folders.map(folder => `${folder}/*`);
	const globbyOptions = {cwd: `${opts.cwd}`};

	return globby(globbyPattern, globbyOptions).then(
		paths => {
			return paths.map(p => {
				return moduleParser(p, `${globbyOptions.cwd}`);
			});
		})
	.then(allModulesPromise => Promise.all(allModulesPromise))
	.then(processmodulesArray);
};

function processmodulesArray(modules) {
	if (modules.length > 0) {
		return modules.reduce((acc, cur) => {
			return _defaultsdeep(
				acc,
				cur
			);
		});
	}
}
