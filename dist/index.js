'use strict';

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _cli = require('./cli');

var _cli2 = _interopRequireDefault(_cli);

var _compressor = require('./compressor');

var _compressor2 = _interopRequireDefault(_compressor);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function run() {
  try {
    await _fsExtra2.default.ensureDir(_config.PATH_ORI_IMAGES);
    console.log('ensureDir', _config.PATH_ORI_IMAGES);

    await _fsExtra2.default.ensureDir(_config.PATH_MIN_IMAGES);
    console.log('ensureDir', _config.PATH_MIN_IMAGES);

    await _fsExtra2.default.emptyDir(_config.PATH_MIN_IMAGES);
    console.log('emptyDir', _config.PATH_MIN_IMAGES);

    (0, _cli2.default)(_compressor2.default);
  } catch (error) {
    console.log(error);
  }
}

run();