const skeletonParser = require('./src');

module.exports = function (path) {
	console.log('path', path);
	return skeletonParser(path);
};
