var DEBUG = false; // set to false to disable debugging
var old_console_log = console.log;
console.log = function () {
  if (DEBUG) {
    old_console_log.apply(this, arguments);
  }
};
