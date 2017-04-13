const pugTemplateEnhancer = require('./pug-template-enhancer');

const ENHANCERS = [
	pugTemplateEnhancer
];

module.exports = parsedTree =>
	ENHANCERS.reduce((currentTree, currentEnhancer) => currentEnhancer(currentTree), parsedTree)
	;
