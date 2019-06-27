export default class Logger {
  constructor(DEBUG) {
    this.DEBUG = DEBUG;
  }

  log(message) {
    this.DEBUG && console.log(message);
  }
}
