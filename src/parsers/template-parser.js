const path = require('path');
const fsp = require('fs-promise');
const lexer = require('pug-lexer');

module.exports = filename => {
	return fsp.readFile(filename, {encoding: 'utf8'})
		.then(contents => {
			const mixinToken = lexer(contents)
				.find(token => token.type === 'mixin');

			if (mixinToken) {
				return {
					path: path.basename(filename),
					contents: '\n' + contents + '\n',
					mixin: mixinToken.val
				};
			}

			return {
				path: path.basename(filename)
			};
		});
};
