'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isExists = isExists;
exports.ensureOriginal = ensureOriginal;
exports.ensureMinimize = ensureMinimize;
exports.default = initial;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function isExists(path) {
  var exists = await _fsExtra2.default.pathExists(path);
  return exists;
}

async function ensureOriginal() {
  try {
    await _fsExtra2.default.ensureDir(_config.PATH_ORI_IMAGES);
  } catch (error) {
    console.log('Error in ensureOriginal()', error);
  }
}

async function ensureMinimize() {
  try {
    await _fsExtra2.default.ensureDir(_config.PATH_MIN_IMAGES);
  } catch (error) {
    console.log('Error in ensureOriginal()', error);
  }
}

function initial() {
  ensureOriginal();
  ensureMinimize();
}