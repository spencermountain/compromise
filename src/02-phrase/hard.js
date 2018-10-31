const append = require('./join/append');
const prepend = require('./join/prepend');
// const insertAfter = require('./insert/after');
module.exports = {

  //accept a phrase object and put it at the end
  append: function(phrase, doc) {
    append(this, phrase, doc);
    return this;
  },
  prepend: function(phrase, doc) {
    prepend(this, phrase, doc);
    return this;
  }
};
