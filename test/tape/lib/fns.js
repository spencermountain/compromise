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
  terms = terms || [];
  var str = '';
  var got = terms.map(function(term) {
    str += ' ' + term.text;
    return Object.keys(term.pos).join('|');
  }).join(', ');
  var msg = '"' + str.trim() + '" has tags [' + tags.join(',') + ']   (' + got + ')';
  t.equal(has_pos(terms, tags), true, msg);
  return;
};

const terms_test = function(terms, want, t, isText) {
  var str = '';
  var got = terms.map(function(term) {
    str += ' ' + term.text;
    if (isText) {
      return term.text;
    }
    return term.normal;
  });
  var msg = '"' + str + '"  got: [' + got.join(',') + ']  want: [' + want.join(',') + ']';
  t.deepEqual(got, want, msg);
};



module.exports = {
  str_test: str_test,
  pos_test: pos_test,
  terms_test: terms_test,
};
