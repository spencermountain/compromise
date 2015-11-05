'use strict';
const firstnames = require('../../../data/firstnames');
const abbreviations = require('../../../data/abbreviations');

let org_suffix = abbreviations.orgs.reduce(function(h, s) {
  h[s] = true;
  return h;
}, {});

const is_organisation = function(str) {

  return false;
};

module.exports = is_organisation;
