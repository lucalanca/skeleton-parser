module.exports = {
	materials: {
		audios: {
			assets: ['welcome.mp3']
		},
		colors: {
			documentation: 'docs.spec.pug',
			style: 'style.scss'
		},
		fonts: {
			documentation: 'docs.spec.pug',
			style: 'style.scss',
			fonts: ['serif.ttf']
		},
		icons: {
			assets: ['bar.svg', 'foo.svg']
		},
		images: {
			assets: ['background.png']
		},
		spaces: {
			documentation: 'docs.spec.pug',
			style: 'style.scss'
		},
		videos: {
			assets: ['hero.mp4']
		}
	},
	elements: {
		grid: {
			documentation: 'docs.spec.pug',
			style: 'style.scss'
		}
	},
	modules: {
		bar: {
			template: {
				path: 'template.pug',
				mixin: 'bar',
				contents: `
mixin bar(data, options)
	h1 Hello #{data.arg1}

`
			},
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
			documentation: 'docs.spec.pug',
			script: 'script.js',
			style: 'style.scss'
		},
		foo: {
			template: {
				path: 'template.pug',
				mixin: 'foo',
				contents: `
mixin foo(data, options)
	h1 World #{data.arg2}

`
			},
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
			documentation: 'docs.spec.pug',
			script: 'script.js',
			style: 'style.scss'
		}
	}
};
