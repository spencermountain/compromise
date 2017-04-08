const numOrdinal = require('./numOrdinal');
const textOrdinal = require('./textOrdinal');
const textCardinal = require('./textCardinal');
const niceNumber = require('./niceNumber');

//make all the number formats
const fmt = {
  number: {
    cardinal: function(num) {
      return num;
    },
    ordinal: function(num) {
      return numOrdinal(num);
    },
    nice: function(num) {
      return niceNumber(num);
    },
    niceOrdinal: function(num) {
      num = numOrdinal(num);
      num = niceNumber(num);
      return num;
    }
  },
  text: {
    cardinal: function(num) {
      return textCardinal(num).join(' ');
    },
    ordinal: function(num) {
      return textOrdinal(num);
    },
  }
};
module.exports = fmt;
