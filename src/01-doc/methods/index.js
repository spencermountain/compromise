const methods = Object.assign(
  {},
  require('./01-utils'),
  require('./02-misc'),
  require('./03-split'),
  require('./04-selections')
);

const addMethods = function(Doc) {
  Object.keys(methods).forEach(k => {
    Doc.prototype[k] = methods[k];
  });
  return Doc;
};

module.exports = addMethods;
