const path = require('path');

module.exports = filename => {
	return Promise.resolve([path.basename(filename)]);
};
