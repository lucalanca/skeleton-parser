module.exports = {
	elements: {
		colors: {
			style: 'styles.scss',
			documentation: 'doc.spec.jade',
			path: 'fixtures/simple/src/elements/colors/'
		},
		grid: {
			style: 'styles.scss',
			documentation: 'doc.spec.jade',
			path: 'fixtures/simple/src/elements/grid/'
		}
	},
	modules: {
		bar: {
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
			documentation: 'doc.spec.jade',
			path: 'fixtures/simple/src/modules/bar/'
		},
		foo: {
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
			documentation: 'doc.spec.jade',
			path: 'fixtures/simple/src/modules/foo/'
		}
	}
};
