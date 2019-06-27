'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _globPromise = require('glob-promise');

var _globPromise2 = _interopRequireDefault(_globPromise);

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

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _config = require('./config');

var _Progress = require('./Progress');

var _Progress2 = _interopRequireDefault(_Progress);

var _questions = require('./questions');

var _questions2 = _interopRequireDefault(_questions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bar = new _Progress2.default();
var logger = new _Logger2.default(true);

async function cli() {
  logger.log('start question');

  try {
    return await _inquirer2.default.prompt(_questions2.default);
  } catch (error) {
    console.log('TCL: cli -> error', error);
  }

  logger.log('end question');

  return false;
}

async function ensureSourceFolder() {
  try {
    await _fsExtra2.default.ensureDir(_config.SOURCE_PATH);
    logger.log('ensure SOURCE_PATH', _config.SOURCE_PATH);
  } catch (error) {
    console.log('TCL: ensureSourceFolder -> error', error);
  }
}

async function ensureBuildFolder() {
  try {
    await _fsExtra2.default.ensureDir(_config.BUILD_PATH);
    logger.log('ensure BUILD_PATH', _config.BUILD_PATH);
  } catch (error) {
    console.log('TCL: ensureBuildFolder -> error', error);
  }
}

async function emptyBuildFolder() {
  try {
    await _fsExtra2.default.ensureDir(_config.BUILD_PATH);
    logger.log('empty BUILD_PATH', _config.BUILD_PATH);
  } catch (error) {
    console.log('TCL: emptyBuildFolder -> error', error);
  }
}

async function getSources(_ref) {
  var path = _ref.path;

  try {
    return await (0, _globPromise2.default)(path + '/**/*.{jpg,png}');
  } catch (error) {
    console.log('TCL: getSources -> error', error);
  }

  return false;
}

function getOutputPath(source, image) {
  var build = image.replace(source + '/', '');
  return build.substring(0, build.lastIndexOf('/'));
}

function getJpegOptions(quality) {
  return {
    quality: parseFloat(quality) * 100
  };
}

function getPngOptions(quality) {
  return {
    quality: [parseFloat(quality), 1]
  };
}

async function lossyCompress(type, quality, image, output) {
  await (0, _imagemin2.default)([image], _config.BUILD_PATH + '/' + output, {
    plugins: [(0, _imageminMozjpeg2.default)(getJpegOptions(quality)), (0, _imageminPngquant2.default)(getPngOptions(quality))]
  });

  bar.update();
}

async function losslessCompress(type, quality, image, output) {
  await (0, _imagemin2.default)([image], _config.BUILD_PATH + '/' + output, {
    plugins: [(0, _imageminJpegtran2.default)(getJpegOptions(quality)), (0, _imageminOptipng2.default)(getPngOptions(quality))]
  });

  bar.update();
}

async function compress(images, _ref2) {
  var _ref2$path = _ref2.path,
      path = _ref2$path === undefined ? _config.SOURCE_PATH : _ref2$path,
      _ref2$quality = _ref2.quality,
      quality = _ref2$quality === undefined ? _config.QUALITY : _ref2$quality,
      _ref2$type = _ref2.type,
      type = _ref2$type === undefined ? _config.PLUGIN : _ref2$type;

  var compressors = [];

  images.forEach(function (image) {
    var output = getOutputPath(path, image);

    if (type === 'lossy') {
      compressors.push(lossyCompress(type, quality, image, output));
    } else {
      compressors.push(losslessCompress(type, quality, image, output));
    }
  });

  try {
    await Promise.all(compressors);
  } catch (error) {
    console.log('TCL: compress -> error', error);
  }
}

/**
 * Main
 * ------------
 * control the main program process
 */
async function main() {
  logger.log('code start');

  // ask question
  var result = await cli();
  // console.log('TCL: main -> result', result);

  // create source, build folder, and empty build folder
  await ensureSourceFolder();
  await ensureBuildFolder();
  await emptyBuildFolder();
  logger.log('environment ready');

  // read sources
  var images = await getSources(result);
  bar.setWidth(images.length);
  // console.log('TCL: getSources -> images', images);

  // run compressor
  logger.log('compress start');
  bar.start();

  await compress(images, result);
  logger.log('compress end');

  bar.stop();

  // end, and open build folder
  logger.log('code end');
}

main();