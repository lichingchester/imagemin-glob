'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emptyDirectory = emptyDirectory;
exports.isExists = isExists;
exports.ensureOriginal = ensureOriginal;
exports.ensureMinimize = ensureMinimize;

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function emptyDirectory(path) {
  try {
    return _fsExtra2.default.emptyDir(path);
    console.log('emptyDirectory', path);
  } catch (error) {
    console.log('Error in emptyDirectory()', error);
  }
}

async function isExists(path) {
  var exists = await _fsExtra2.default.pathExists(path);
  return exists;
}

function ensureOriginal() {
  // try {
  return _fsExtra2.default.ensureDir(_config.PATH_ORI_IMAGES);
  // console.log('ensureOriginal');
  // } catch (error) {
  // console.log('Error in ensureOriginal()', error);
  // }
}

function ensureMinimize() {
  try {
    return _fsExtra2.default.ensureDir(_config.PATH_MIN_IMAGES);
    console.log('ensureMinimize');
  } catch (error) {
    console.log('Error in ensureOriginal()', error);
  }
}

exports.default = async function initial() {
  await ensureOriginal();
  await ensureMinimize();

  // remove directory
  await emptyDirectory('./build');

  console.log('end initial');
};