'use strict';

var _cli = require('./cli');

var _cli2 = _interopRequireDefault(_cli);

var _fse = require('./fse');

var _fse2 = _interopRequireDefault(_fse);

var _compressor = require('./compressor');

var _compressor2 = _interopRequireDefault(_compressor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// create the required folders
(0, _fse2.default)();

// get the params from user
(0, _cli2.default)(_compressor2.default);