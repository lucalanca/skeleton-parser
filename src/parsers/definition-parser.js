const fsp = require('fs-promise');
const yaml = require('js-yaml');

module.exports = filename => {
	return fsp.readFile(filename)
		.then(yaml.load);
};
