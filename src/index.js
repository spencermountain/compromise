const build = require('./build');
const pkg = require('../package.json');
const World = require('./world');
let world = new World();


const nlp = function(text) {
  return build(text, world);
};
//uncompress a user-submitted lexicon
nlp.plugin = function(plugin) {
  world.plugin(plugin);
};

nlp.clone = function() {};

//this is handy
nlp.version = pkg.version;

//and then all the exports..
if (typeof self !== 'undefined') {
  self.nlp = nlp; // Web Worker
} else if (typeof window !== 'undefined') {
  window.nlp = nlp; // Browser
} else if (typeof global !== 'undefined') {
  global.nlp = nlp; // NodeJS
}
//don't forget amd!
if (typeof define === 'function' && define.amd) {
  define(nlp);
}
if (typeof module !== 'undefined') {
  module.exports = nlp;
}
