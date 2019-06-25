'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compress;

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

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function compile(path, build, quality, type, output) {
  var plugin = [];
  if (type === 'lossy') {
    plugin = [(0, _imageminMozjpeg2.default)({
      quality: quality * 100
    }), (0, _imageminPngquant2.default)({
      quality: [quality, 1]
    })];
  } else {
    plugin = [(0, _imageminJpegtran2.default)({
      quality: quality * 100
    }), (0, _imageminOptipng2.default)({
      quality: [quality, 1]
    })];
  }

  var files = await (0, _imagemin2.default)([path], build + '/' + output, {
    plugins: plugin
  });

  console.log(files);
}

function compress(_ref) {
  var path = _ref.path,
      build = _ref.build,
      quality = _ref.quality,
      type = _ref.type;

  (0, _glob2.default)(path + '/**/*.{jpg,png}', function (er, files) {
    files.forEach(function (file) {
      var output = file.substring(0, file.lastIndexOf('images/'));
      compile(path, build, quality, type, output);
    });
  });
}