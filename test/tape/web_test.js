var test = require('tape');
var nlp = require('./lib/nlp');
var str_test = require('./lib/fns').str_test;

test('=Web Terminology=', function(T) {

  T.test('is-email:', function(t) {
    [
      [`s@s.com`, true],
      [`sasdf@sasdf.com`, true],
      [`sasdf@sasdf.ti`, true],
      [`sasdf@sasdf.t`,],
      [`sasdf@sasdft`,],
      [`sasdfsasdft.com`,],
      [`@sasdft.com`,],
      [`_@_.com`, true],
      [`_@_._`,],
      [`sas df@sasdf.com`,],
      [`sasdf@sa sdf.com`,],
    ].forEach(function (a) {
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' is email: ' + a[1];
      t.equal(term.pos['Email'], a[1], msg);
    });
    t.end();
  });

  T.test('is-hashtag:', function(t) {
    [
      [`#lkjsdf`, true],
      [`#ll`, true],
      [`#22ll`, true],
      [`#_22ll`, true],
      [`#l`,],
      [`# l`,],
      [`l#l`,],
    ].forEach(function (a) {
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' is hashtag: ' + a[1];
      t.equal(term.pos['HashTag'], a[1], msg);
    });
    t.end();
  });

  T.test('is-url:', function(t) {
    [
      [`http://cool.com/fun`, true],
      [`https://cool.com`, true],
      [`https://cool.com/`, true],
      [`https://www.cool.com/`, true],
      [`http://subdomain.cool.com/`, true],
      [`www.fun.com/`, true],
      [`www.fun.com`, true],
      [`www.fun.com/foobar/fun`, true],
      [`www.subdomain.cool.com/`, true],
      [`wwwsubdomain.cool.com/`, true],
      [`woo.br`, true],
      [`woohoo.biz`, true],
      [`woop.org/news`, true],
      [`http://woop.org/news?foo=bar`, true],

      [`http:subdomain.cool.com/`,],
      [`coolcom`,],
    ].forEach(function (a) {
      var term = nlp.sentence(a[0]).terms[0];
      var msg = a[0] + ' is url: ' + a[1];
      t.equal(term.pos['Url'], a[1], msg);
    });
    t.end();
  });

});
