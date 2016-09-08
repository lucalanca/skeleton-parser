#!/usr/bin/env node
'use strict';
const meow = require('meow');
const skeletonParser = require('./');

const cli = meow({
	help: [
		'Usage',
		'  skeleton-parser folder [options]',
		'',
		'Example',
		'  skeleton-parser .',
		'',
		'Options',
		'  --verbose      Detailed summary.',
		'  --key          Google API Key. By default the free tier is used.'
	]
});

if (!cli.input[0]) {
	console.error('Please supply an URL');
	process.exit(1);
}

skeletonParser(cli.input[0], cli.flags)
	.then(result => {
		console.log(JSON.stringify(result, undefined, 2));
	})
	.catch(err => {
		console.error(err);
		process.exit(1);
	});

