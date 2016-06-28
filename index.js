'use strict';

const globby = require('globby');
const groupBy = require('lodash.groupby');
const defaults = require('lodash.defaults');

function groupSkeletonThingsByType(things) {
	return groupBy(things, 'type');
}

class SkeletonThing {
	constructor(path, innerPaths) {
		this.path = path;
		this.innerPaths = innerPaths;
		this.name = SkeletonThing.getNameByPath(path);
		this.type = SkeletonThing.getTypeByPath(path);
	}

	static getNameByPath(path) {
		return path.slice(path.indexOf('/') + 1);
	}

	static getTypeByPath(path) {
		return path.slice(0, path.indexOf('/'));
	}
}
const DEFAULT_EXTENSIONS = ['jade', 'scss', 'js', 'yml', 'md'];
SkeletonThing.THING_PATTERN = DEFAULT_EXTENSIONS.map(ext => `*.${ext}`);

function processThing(path, globbyOptions) {
	return globby(SkeletonThing.THING_PATTERN, globbyOptions)
		.then(
			innerPaths => new SkeletonThing(path, innerPaths),
			() => new SkeletonThing(path, [])
		);
}

const DEFAULT_OPTIONS = {
	folders: ['elements', 'modules', 'pages']
};

module.exports = function (root, options) {
	options = defaults({}, options, DEFAULT_OPTIONS);
	const globbyPattern = options.folders.map(f => `${f}/*`);
	const globbyOptions = {cwd: `${root}/src`};
	return globby(globbyPattern, globbyOptions)
		.then(paths => {
			return paths.map(p => {
				const thingGlobbyOptions = {cwd: `${globbyOptions.cwd}/${p}`};
				return processThing(p, thingGlobbyOptions);
			});
		})
		.then(allThingsPromises => Promise.all(allThingsPromises))
		.then(groupSkeletonThingsByType)
		;
};

