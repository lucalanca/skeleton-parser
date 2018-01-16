#!/usr/bin/env node

'use strict';

var meow = require('meow');
var skeletonParser = require('./');

var cli = meow({
	help: ['Usage', '  skeleton-parser folder [options]', '', 'Example', '  skeleton-parser .', ''
	// 'Options',
	// '  --verbose      Detailed summary.',
	]
});

if (!cli.input[0]) {
	console.error('Please supply a folder path');
	process.exit(1);
}

var options = Object.assign({}, { cwd: cli.input[0] }, cli.flags);

skeletonParser(options).then(function (result) {
	console.log(JSON.stringify(result, undefined, 2));
}).catch(function (err) {
	console.error(err);
	process.exit(1);
});