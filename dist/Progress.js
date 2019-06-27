'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cliProgress2 = require('cli-progress');

var _cliProgress3 = _interopRequireDefault(_cliProgress2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Progress = function () {
  function Progress() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Progress);

    this.bar = new _cliProgress3.default.Bar(options, _cliProgress3.default.Presets.shades_classic);
    this.width = 0;
  }

  _createClass(Progress, [{
    key: 'setWidth',
    value: function setWidth(width) {
      this.width = width;
    }
  }, {
    key: 'start',
    value: function start() {
      this.bar.start(this.width, 0);
    }
  }, {
    key: 'update',
    value: function update() {
      this.bar.increment();
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.bar.stop();
    }
  }]);

  return Progress;
}();

exports.default = Progress;