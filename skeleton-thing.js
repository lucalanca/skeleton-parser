'use strict';

const path = require('path');
const yaml = require('js-yaml');
const values = require('lodash.values');

const negate = require('lodash.negate');
const pickBy = require('lodash.pickby');

const isUndefined = require('lodash.isundefined');
const fsp = require('fs-promise');
const globby = require('globby');

// const templateParser = require('./src/helpers/template-parser');
// const styleParser = require('./src/helpers/style-parser');

const DEFAULT_EXTENSIONS_BY_TYPE = {
	TEMPLATE: [
		'*.jade',
		'!*.spec.jade'
	],
	STYLE: ['*.scss'],
	SCRIPT: ['*.js'],
	DEFINITION: ['*.yml'],
	DOC: ['*.spec.jade']
};

// function getPathFileName(path) {
// 	return path.slice(path.lastIndexOf('/') + 1);
// }

function getFileTypeContents(filetypes, root) {
	return globby(filetypes, {cwd: path.resolve(__dirname, root)})
		.then(relativePaths => {
			if (relativePaths.length) {
				const absolutePath = `${path.resolve(__dirname, root)}/${relativePaths[0]}`;
				return fsp.readFile(absolutePath, {encoding: 'utf8'});
			}
		});
}

class SkeletonThing {
	constructor(path, data) {
		this.name = SkeletonThing.getNameByPath(path);
		this.type = SkeletonThing.getTypeByPath(path);
		this.id = `${this.type}/${this.name}`;

		this.data = data;
		this.templateData = data[0];
		this.definitionData = data[1];
		this.styleData = data[2];
		this.scriptData = data[3];
		this.docData = data[4];

		// console.log('scriptData', this.scriptData);
	}

	static create(name, root) {
		return Promise
			.all([
				SkeletonThing.parseTemplate(root),
				SkeletonThing.parseDefinition(root),
				SkeletonThing.parseStyle(root),
				SkeletonThing.parseScript(root),
				SkeletonThing.parseDoc(root)
			])
			.then(parsedData => {
				return new SkeletonThing(name, parsedData);
			}, err => console.log('error parsing', name, err));
	}

	static parseTemplate(root) {
		return getFileTypeContents(DEFAULT_EXTENSIONS_BY_TYPE.TEMPLATE, root)
			.then(contents => {
				if (contents) {
					return true;
				}
			})
			// .then(templateParser.extractMixinsName)
			// .then(mixins => {
			// 	if (mixins && mixins.length) {
			// 		return {mixins};
			// 	}
			// })
			;
	}

	static parseStyle(root) {
		return getFileTypeContents(DEFAULT_EXTENSIONS_BY_TYPE.STYLE, root)
			.then(contents => {
				if (contents) {

					return true;
				}
			})
			// .then(styleParser.extractVariables)
			;
	}

	static parseScript(root) {
		return getFileTypeContents(DEFAULT_EXTENSIONS_BY_TYPE.SCRIPT, root)
			.then(contents => {
				if (contents) {
					return true;
				}
			})
			;
	}

	static parseDefinition(root) {
		return getFileTypeContents(DEFAULT_EXTENSIONS_BY_TYPE.DEFINITION, root)
			.then(yaml.load)
			.then(contents => {
				if (contents && contents !== 'undefined') {
					return contents;
				}
			})
			;
	}

	static parseDoc(root) {
		return getFileTypeContents(DEFAULT_EXTENSIONS_BY_TYPE.DOC, root)
			.then(contents => {
				if (contents) {
					return true;
				}
			})
			;
	}

	static getNameByPath(path) {
		return path.slice(path.lastIndexOf('/') + 1);
	}

	static getTypeByPath(path) {
		return path.slice(0, path.indexOf('/'));
	}

	getInnerPathByType(type) {
		return this.innerPaths.find(p => p.indexOf(type) !== -1);
	}

	getInnerPathContentByType(type) {
		const found = this.getInnerPathByType(type);
		if (found) {
			return this.innerPathsContents[found.indexOf(type)];
		}
	}

	appendInnerPathsContent(innerPathsContents) {
		this.innerPathsContents = innerPathsContents;
		return this;
	}

	parseInnerPathsContent() {
		return this;
	}

	toJson() {
		if (this.type === 'modules' || this.type === 'elements') {
			return pickBy({
				template: this.templateData,
				definition: this.definitionData,
				documentation: this.docData,
				script: this.scriptData,
				style: this.styleData
			}, negate(isUndefined));
		}

		return {};
	}
}

module.exports = SkeletonThing;
