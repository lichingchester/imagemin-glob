'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fse = require('./fse');

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var questions = [{
  type: 'input',
  name: 'path',
  message: 'Enter the path of the original images directory: ',
  default: './images',
  validate: function validate(value) {
    if (!(0, _fse.isExists)(value)) {
      return 'Directory not exists! ';
    }

    return true;
  }
}, {
  type: 'input',
  name: 'build',
  message: 'Enter the path of the build directory: ',
  default: './build',
  validate: function validate(value) {
    if (!(0, _fse.isExists)(value)) {
      return 'Directory not exists! ';
    }

    return true;
  }
}, {
  type: 'number',
  name: 'quality',
  message: 'Enter the quality (0.1 - 1): ',
  default: _config.DEFAULT_QUALITY,
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

exports.default = async function cli(callback) {
  console.log('start question');
  callback((await _inquirer2.default.prompt(questions)));
};