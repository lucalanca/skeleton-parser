const IMAGE_EXTENSIONS = require('image-extensions');
const AUDIO_EXTENSIONS = require('audio-extensions');
const FONT_EXTENSIONS = require('font-extensions');

const TYPE_EXTENSIONS = {
	documentation: ['.spec.pug'],
	style: ['.scss'],
	script: ['.js'],
	template: ['.pug', '.jade'],
	definition: ['.yml'],
	assets: IMAGE_EXTENSIONS.concat(AUDIO_EXTENSIONS),
	fonts: FONT_EXTENSIONS
};

const TYPE_PARSERS = {
	documentation: require('./documentation-parser'),
	style: require('./style-parser'),
	script: require('./script-parser'),
	template: require('./template-parser'),
	definition: require('./definition-parser'),
	assets: require('./asset-parser'),
	fonts: require('./font-parser')
};

function extractTypeOfFile(path) {
	return Object.keys(TYPE_EXTENSIONS)
		.find(type => TYPE_EXTENSIONS[type].find(extension => path.endsWith(extension)))
		;
}

module.exports = path => {
	const type = extractTypeOfFile(path);
	return TYPE_PARSERS[type](path).then(data => ({type, data}));
};
