const debug = require('./debug');
module.exports = {
  debug: function() {
    debug(this);
    return this;
  }
};
