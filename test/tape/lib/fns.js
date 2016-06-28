//helpers to make test output messages nicer
const str_test = function(got, input, output, t) {
  var msg = '\'' + input + '\' -> \'' + got + '\'';
  t.equal(got, output, msg);
  return;
};

module.exports = {
  str_test: str_test,
};
