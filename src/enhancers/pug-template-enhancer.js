var pug = require('pug');

function mergeThingsWithTemplateContents(tree) {
	const mergedTemplates = Object.keys(tree)
		.map(layer => {
			return Object.keys(tree[layer])
				.map(thingName => {
					return tree[layer][thingName].template && tree[layer][thingName].template.contents;
				})
				.filter(Boolean)
				.join('\n');
		})
		.join('');
	return mergedTemplates;
}

function treeEnhancerMapper(tree, thingEnhancer) {
	return Object.keys(tree)
		.reduce((currentEnhancedTree, currentLayerName) => {
			const enhancedLayer = Object.keys(tree[currentLayerName])
				.reduce((currentEnhancedLayer, currentThingName) => {
					const currentThing = tree[currentLayerName][currentThingName];
					return Object.assign({}, currentEnhancedLayer, {
						[currentThingName]: thingEnhancer(currentThing)
					});
				}, {});
			return Object.assign({}, currentEnhancedTree, {
				[currentLayerName]: enhancedLayer
			});
		}, {});
}

module.exports = tree => {

	// Compile a function
	var fn1 = pug.compile('string of pug', {});
	// Render the function
	var html = fn1({});
	console.log({html});


	const mergedTemplates = mergeThingsWithTemplateContents(tree);
	const enhanced = treeEnhancerMapper(tree, thing => {
		if (!thing.template || !thing.template.mixin) {
			return thing;
		}

		const stringOfJade = `
${mergedTemplates}
+${thing.template.mixin}(data, options)
`;
		const fn = pug.compile(stringOfJade, {});

		return Object.assign({}, thing, { fn });
		// const fn = pug.compile(, {});
		// console.log(fn());

	});

	return enhanced;
};
