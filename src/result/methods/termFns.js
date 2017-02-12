'use strict';

const termLoops = (Text) => {

  //these methods aren't documented
  const methods = {


  };

  Object.keys(methods).forEach((k) => {
    Text.prototype[k] = methods[k];
  });
  return Text;
};

module.exports = termLoops;
