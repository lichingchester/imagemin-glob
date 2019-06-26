'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compress;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function compress(_ref) {
  var path = _ref.path,
      quality = _ref.quality,
      type = _ref.type;

  var progress = new _cliProgress3.default.Bar({
    stopOnComplete: true
  }, _cliProgress3.default.Presets.shades_classic);

  (0, _glob2.default)(path + '/**/*.{jpg,png}', function (er, files) {
    progress.start(files.length, 0);

    files.forEach(function (filePath) {
      var buildPath = filePath.replace(path + '/', '');
      var output = buildPath.substring(0, buildPath.lastIndexOf('/'));

      (async function () {
        if (type === 'lossy') {
          await (0, _imagemin2.default)([filePath], _config.PATH_MIN_IMAGES + '/' + output, {
            plugins: [(0, _imageminMozjpeg2.default)({
              quality: parseFloat(quality) * 100
            }), (0, _imageminPngquant2.default)({
              quality: [parseFloat(quality), 1]
            })]
          });
        } else {
          await (0, _imagemin2.default)([filePath], _config.PATH_MIN_IMAGES + '/' + output, {
            plugins: [(0, _imageminJpegtran2.default)({
              quality: parseFloat(quality) * 100
            }), (0, _imageminOptipng2.default)({
              quality: [parseFloat(quality), 1]
            })]
          });
        }

        progress.increment();
      })();
    });
  });
}