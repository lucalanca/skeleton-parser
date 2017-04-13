/* global test,expect */
const path = require('path');
const skeletonParser = require('./index');

const TEST_CASES = {
	normal: {
		fixture: path.resolve(__dirname, '../test/fixtures/simple/src'),
		expected: require('../test/expected/_simple')
	}
};

test('Tests the normal use case', () => {
	return skeletonParser(TEST_CASES.normal.fixture)
		.then(parsed => {
			const locals = {
				data: {
					arg1: 'world'
				}
			};

			expect(parsed.modules.bar.fn(locals)).toEqual('<h1>Hello world</h1>');
		});
		// .then(actual => expect(actual).toEqual(TEST_CASES.normal.expected));
});
