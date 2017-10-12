//this is our default data in the same form as a plugin
// it is compressed, like a plugin, and written into ./src/world
module.exports = {
  words: require('./words'),
  conjugations: require('./conjugations'),
  plurals: require('./plurals'),
  patterns: require('./patterns'),
  regex: require('./regex'),
};
