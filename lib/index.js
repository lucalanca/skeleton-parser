'use strict';

var globby = require('globby');
var merge = require('lodash.merge');
var moduleParser = require('./module-parser');

var DEFAULT_OPTIONS = {
	cwd: '.',
	folders: ['elements', 'modules'],
	yml: true, // Default option to parse .yml files
	src: 'src'
};

module.exports = function () {
	var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	var opts = Object.assign({}, DEFAULT_OPTIONS, options);
	var globbyPattern = opts.folders.map(function (folder) {
		return folder + '/*';
	});
	var globbyOptions = { cwd: opts.cwd + '/' + opts.src };

	return globby(globbyPattern, globbyOptions).then(function (paths) {
		return paths.map(function (p) {
			return moduleParser(p, '' + globbyOptions.cwd, opts.yml);
		});
	}).then(function (allModulesPromise) {
		return Promise.all(allModulesPromise);
	}).then(mergeArrayOfObjects);
};

function mergeArrayOfObjects(modules) {
	return modules.reduce(function (acc, cur) {
		return merge(acc, cur);
	}, {});
}