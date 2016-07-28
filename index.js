'use strict';

const globby = require('globby');

const defaults = require('lodash.defaults');
const SkeletonThing = require('./skeleton-thing');

function processSkeletonThingsArray(skeletonThings) {
	return skeletonThings.reduce((acc, cur) => {
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
			console.log('paths', paths);
			return paths.map(p => {
				return SkeletonThing.create(p, `${globbyOptions.cwd}/${p}`);
			});
		})
		.then(allSkeletonThingPromise => Promise.all(allSkeletonThingPromise))
		.then(processSkeletonThingsArray)
		;
};
