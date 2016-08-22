module.exports = {
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
