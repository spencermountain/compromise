const build = require('./build');
//
const nlp = function(text) {
  return build(text);
};
module.exports = nlp;
