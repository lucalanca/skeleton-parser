import test from 'ava';
import difflet from 'difflet';
import m from './';

const diff = difflet({indent: 2});
const expected = {
	'elements/colors': {
		style: true,
		documentation: true
	},
	'elements/grid': {
		style: true,
		documentation: true
	},
	'modules/bar': {
		template: true,
		script: true,
		definition: {
			data: {
				arg1: 'ads',
				arg2: 'asd'
			},
			options: {
				opt1: ['op1-defaul', 'op1-other'],
				opt2: ['op2-defaul', 'op2-other']
			}
		},
		documentation: true,
		style: true
	},
	'modules/foo': {
		template: true,
		script: true,
		definition: {
			data: {
				arg1: 'ads',
				arg2: 'asd'
			},
			options: {
				opt1: ['op1-defaul', 'op1-other'],
				opt2: ['op2-defaul', 'op2-other']
			}
		},
		documentation: true,
		style: true
	}
	// ,
	// 'pages/index.jade': {
	// }
};

test('Tests the normal use case', async t => {
	const actual = await m('./fixtures/simple');
	t.deepEqual(actual, expected, diff.compare(actual, expected));
});


test('Tests the folder passing use case', async t => {
	const actual = await m('./fixtures/simple', {folders: ['elements']});
	const elementsExpected = {
		'elements/colors': expected['elements/colors'],
		'elements/grid': expected['elements/grid']
	};

	t.deepEqual(actual, elementsExpected, diff.compare(actual, elementsExpected));
});
