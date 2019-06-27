import _cliProgress from 'cli-progress';

export default class Progress {
  constructor(options = {}) {
    this.bar = new _cliProgress.Bar(options, _cliProgress.Presets.shades_classic);
    this.width = 0;
  }

  setWidth(width) {
    this.width = width;
  }

  start() {
    this.bar.start(this.width, 0);
  }

  update() {
    this.bar.increment();
  }

  stop() {
    this.bar.stop();
  }
}
