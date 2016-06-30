//helpers to make test output messages nicer
const str_test = function(got, input, output, t) {
  var msg = '\'' + input + '\' -> \'' + got + '\'';
  t.equal(got, output, msg);
  return;
};

const has_pos = function(terms, tags) {
  if (terms.length !== tags.length) {
    return false;
  }
  for(var i = 0; i < terms.length; i++) {
    if (!terms[i].pos[tags[i]]) {
      return false;
    }
  }
  return true;
};

const pos_test = function(terms, tags, t) {
  var msg = 'has tags ' + tags.join(',');
  t.equal(has_pos(terms, tags), true, msg);
  return;
};

const terms_test = function(terms, want, t) {
  var got = terms.map(function(t) {
    return t.normal;
  });
  var msg = got.join(',') + ' -> ' + want.join(',');
  t.deepEqual(got, want, msg);
};

module.exports = {
  str_test: str_test,
  pos_test: pos_test,
  terms_test: terms_test
};
