'use strict';
'use strict';
const log = require('../paths').log;
const path = 'tagger/value';

const value_step = function(ts) {
  log.here(path);
  ts.terms.forEach((t) => {
    if (t.tags.Value) {
      //ordinal/cardinal
      if (!t.tags.Ordinal && !t.tags.Cardinal) {
        if (t.normal.match(/^[0-9]([0-9]+,)*?(\.[0-9])$/)) {
          t.tag('Cardinal', 'ordinal-regex');
        } else {
          t.tag('Cardinal', 'cardinal-regex');
        }
      }
      //text/number
      if (!t.tags.TextValue && !t.tags.NumericValue) {
        if (t.normal.match(/^[a-z]/)) {
          t.tag('TextValue', 'TextValue-regex');
        } else {
          t.tag('NumericValue', 'NumericValue-regex');
        }
      }
    }
  });
  return ts;
};

module.exports = value_step;
