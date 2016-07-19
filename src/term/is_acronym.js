'use strict';
const is_acronym = function(str) {
  //like N.D.A
  if (str.match(/([A-Z]\.)+[A-Z]?$/)) {
    return true;
  }
  //like NDA
  if (str.match(/[A-Z]{2,}$/)) {
    return true;
  }
  return false;
};
module.exports = is_acronym;
