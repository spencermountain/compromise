'use strict';
// const findGender = require('./gender');

const info = {
  /**
    predict, statistically, if this name is generally male/female/ambiguous
    used for resolution of following pronouns.
    (not meant for use in classification/segmentation of people)
  */
  gender: () => {
    return 'MalePerson' //TODO
  }
};
module.exports = info;
