import test from 'ava';
import difflet from 'difflet';
import m from './';

const diff = difflet({indent: 2});

test.cb(t => {
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
	m('./fixtures/simple').then(actual => {
		console.log(JSON.stringify(actual, undefined, 2));
		t.deepEqual(actual, expected, diff.compare(actual, expected));
		t.end();
	});
});
