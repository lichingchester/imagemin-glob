'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _cliProgress2 = require('cli-progress');

var _cliProgress3 = _interopRequireDefault(_cliProgress2);

var _imagemin = require('imagemin');

var _imagemin2 = _interopRequireDefault(_imagemin);

var _imageminJpegtran = require('imagemin-jpegtran');

var _imageminJpegtran2 = _interopRequireDefault(_imageminJpegtran);

var _imageminMozjpeg = require('imagemin-mozjpeg');

var _imageminMozjpeg2 = _interopRequireDefault(_imageminMozjpeg);

var _imageminOptipng = require('imagemin-optipng');

var _imageminOptipng2 = _interopRequireDefault(_imageminOptipng);

var _imageminPngquant = require('imagemin-pngquant');

var _imageminPngquant2 = _interopRequireDefault(_imageminPngquant);

var _config = require('./config');

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// logging function
function log(status) {
  console.log('----- ' + status + ' -----');
}

async function cli() {
  log('start question');

  try {
    return await _inquirer2.default.prompt(_questions2.default);
  } catch (error) {
    console.log('TCL: cli -> error', error);
  }

  log('end question');

  return false;
}

async function ensureSourceFolder() {
  await _fsExtra2.default.ensureDir(_config.SOURCE_PATH);
  log('ensure SOURCE_PATH', _config.SOURCE_PATH);
}

async function ensureBuildFolder() {
  await _fsExtra2.default.ensureDir(_config.BUILD_PATH);
  log('ensure BUILD_PATH', _config.BUILD_PATH);
}

async function emptyBuildFolder() {
  await _fsExtra2.default.ensureDir(_config.BUILD_PATH);
  log('empty BUILD_PATH', _config.BUILD_PATH);
}

function getSources(_ref) {
  var path = _ref.path;

  var images = [];
  (0, _glob2.default)(path + '/**/*.{jpg,png}', function (er, files) {
    images = files;
  });
  console.log('TCL: getSources -> images', images);
}

// async function compress({
//   path = SOURCE_PATH,
//   quality = QUALITY,
//   type = PLUGIN,
// }) {

// }


/**
 * Main
 * ------------
 * control the main program process
 */
async function main() {
  log('code start');

  // ask question
  var result = await cli();
  console.log('TCL: main -> result', result);

  // create source, build folder, and empty build folder
  await ensureSourceFolder();
  await ensureBuildFolder();
  await emptyBuildFolder();
  log('environment ready');

  var bar = new _Progress2.default();
  bar.start();

  // read sources
  var images = getSources(result);

  // run compressor
  // await compress(result);
  // log('compressed');

  // end, and open build folder
  log('code end');
}

main();