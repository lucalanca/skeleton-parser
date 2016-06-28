import test from 'ava';
import m from './';

test.cb(t => {
	const fixture = {
		elements: [
			{
				path: 'elements/colors',
				innerPaths: ['style.scss'],
				name: 'colors',
				type: 'elements'
			},
			{
				path: 'elements/grid',
				innerPaths: ['style.scss'],
				name: 'grid',
				type: 'elements'
			}
		],
		modules: [
			{
				path: 'modules/bar',
				innerPaths: ['template.jade', 'style.scss', 'script.js', 'definition.yml'],
				name: 'bar',
				type: 'modules'
			},
			{
				path: 'modules/foo',
				innerPaths: ['template.jade', 'style.scss', 'script.js', 'definition.yml'],
				name: 'foo',
				type: 'modules'
			}
		],
		pages: [
			{
				path: 'pages/index.jade',
				innerPaths: [],
				name: 'index.jade',
				type: 'pages'
			}
		]
	};
	m('./fixtures/simple').then(actual => {
		t.deepEqual(actual, fixture);
		t.end();
	});
});
