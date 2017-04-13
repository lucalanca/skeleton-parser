const path = require('path');
// const fsp = require('fs-promise');
// const gonzales = require('gonzales-pe');
// const postcss = require('postcss');
// const syntax = require('postcss-scss');

module.exports = filename => {
	return Promise.resolve(path.basename(filename));
	// return fsp.readFile(filename, {encoding: 'utf8'})
	// 	.then(contents => {
	// 		console.log('filename', filename);
	// 		const root = postcss.parse(contents, {parser: syntax});
	// 		root.walk(node => {
	// 			if (node.type === 'decl') {
	// 				console.log('node', node.prop, node.value, node);
	// 			}
	// 		})
	//
	// 		// const ast = gonzales.parse(contents, {syntax: 'scss'});
	// 		// console.log('ast', ast);
	// 		// ast.forEach(childNode => {
	// 		// 	console.log('childnode', childNode);
	// 		// });
	// 		return path.basename(filename);
	// 	})
};
