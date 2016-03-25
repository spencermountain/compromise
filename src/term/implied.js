'use strict';
//turn "plz"  "please"
const implications = {
  'plz': 'please',
  'tmrw': 'tomorrow',
  'wat': 'what',
  'r': 'are',
  'u': 'you',
};

const implied = function(str) {
  if (implications[str]) {
    return implications[str];
  }
  return null;
};

module.exports = implied;
