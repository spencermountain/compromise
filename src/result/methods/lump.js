'use strict';

const lumpMethods = (Text) => {

  const methods = {

    lump: function () {
      this.list.forEach((ts) => { ts.lump(); });
      return this;
    }
  };

  //hook them into result.proto
  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = lumpMethods;
