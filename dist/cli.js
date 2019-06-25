'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = cli;

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
}];

function cli() {
  _inquirer2.default.prompt(questions).then(function (answers) {
    console.log(JSON.stringify(answers, null, '  '));
  });
}