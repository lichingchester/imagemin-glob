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

// glob("images/**/*.{jpg,png}", (er, files) => {
//   files.forEach((path) => {
//     const output = path.substring(0, path.lastIndexOf("/"));

//     (async () => {
//     	const files = await imagemin([path], `build/${output}`, {
//     		plugins: [
//     			imageminMozjpeg({
//             quality: 85
//           }),
//     			imageminPngquant({
//             quality: [0.85,1]
//           })
//     		]
//     	});

//     	console.log(files);
//     })();
//   })
// });


function compress(_ref) {
  var path = _ref.path,
      build = _ref.build,
      quality = _ref.quality,
      type = _ref.type;

  (0, _glob2.default)('images/**/*.{jpg,png}', function (er, files) {
    // files.forEach((path) => {
    //   const output = path.substring(0, path.lastIndexOf('/'));
    //   console.log(output);
    // })();
    console.log(files);
  });

  // console.log(settings);
}