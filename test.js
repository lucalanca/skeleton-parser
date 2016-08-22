import test from 'ava';
import difflet from 'difflet';
import m from './';

const diff = difflet({indent: 2});
const expected = {
	elements: {
		colors: {
			path: 'src/elements/colors/',
			style: 'styles.scss',
			documentation: 'doc.spec.jade'
		},
		grid: {
			path: 'src/elements/grid/',
			style: 'styles.scss',
			documentation: 'doc.spec.jade'
		}
	},
	modules: {
		bar: {
			path: 'src/modules/bar/',
			template: 'template.jade',
			script: 'script.js',
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
			style: 'styles.scss',
			documentation: 'doc.spec.jade'
		},
		foo: {
			path: 'src/modules/foo/',
			template: 'template.jade',
			script: 'script.js',
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
			style: 'styles.scss',
			documentation: 'doc.spec.jade'
		}
	}

	// ,
	// 'pages/index.jade': {
	// }
};

test('Tests the normal use case', async t => {
	const actual = await m('./fixtures/simple');
	t.deepEqual(actual, expected, diff.compare(actual, expected));
});

test.only('Tests the folder passing use case', async t => {
	const actual = await m('./fixtures/simple', {folders: ['src/elements']});
	const elementsExpected = {
		elements: expected.elements
	};

	t.deepEqual(actual, elementsExpected, diff.compare(actual, elementsExpected));
});
