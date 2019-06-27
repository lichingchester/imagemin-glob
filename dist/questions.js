'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fse = require('./fse');

var _fse2 = _interopRequireDefault(_fse);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [{
  type: 'input',
  name: 'path',
  message: 'Enter the path of the original images directory: ',
  default: './images',
  validate: function validate(value) {
    if (!(0, _fse2.default)(value)) {
      return 'Directory not exists! ';
    }

    return true;
  }
}, {
  type: 'number',
  name: 'quality',
  message: 'Enter the quality (0.1 - 1): ',
  default: _config.QUALITY,
  validate: function validate(value) {
    if (Number.isNaN(parseFloat(value)) && !Number.isFinite(value)) {
      return 'Invalid numeric!';
    }

    if (parseFloat(value) <= 0.1) {
      return 'Large than 0.1 plz';
    }

    return true;
  }
}, {
  type: 'list',
  name: 'type',
  message: 'Choose the compress solution:',
  choices: [{
    name: 'Lossy Plugin(s) - mozjpeg, pngquant',
    value: 'lossy'
  }, {
    name: 'Lossless Plugin(s) - jpegtran, optipng',
    value: 'lossless'
  }],
  default: 0
}];