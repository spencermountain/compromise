'use strict';
//applies the reg capture group setting to the term
const applyCaptureGroup = (term, reg) => {
  if (reg.capture) {
    term.captureGroup = true;
  } else {
    term.captureGroup = undefined;
  }
};
module.exports = applyCaptureGroup;