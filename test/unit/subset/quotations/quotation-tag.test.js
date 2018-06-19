var test = require('tape');
var nlp = require('../../lib/nlp');
var str_test = require('../../lib/fns').str_test;

function testAllQuotes(a, t) {
  var str = nlp(a[0]).match('#Quotation+').out('normal');
  str_test(str, a[0], a[1], t);
}

test('quotation test:', function(t) {
  [
    [`he is "really good"`, `really good`],
    [`he is "really good" i guess`, `really good`],
    [`he is "good" i guess`, `good`],
    [`he is "completely and utterly great" i guess`, `completely and utterly great`],
    [`“quote”`, `quote`],
    [`“quote is here”`, `quote is here`]
  ].forEach(function(a) {
    var str = nlp(a[0]).match('#Quotation+').out('normal');
    str_test(str, a[0], a[1], t);
  });
  t.end();
});

test('Quotations - U+0022 to U+0022', function (t) {
  [
    ['he is \u0022really good\u0022', 'really good'],
    ['he is \u0022really good\u0022 i guess', 'really good'],
    ['he is not \u0022good\u0022 at all :/', 'good'],
    ['\u0022quote\u0022', 'quote'],
    ['\u0022a quote here\u0022', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+FF02 to U+FF02', function (t) {
  [
    ['he is \uFF02really good\uFF02', 'really good'],
    ['he is \uFF02really good\uFF02 i guess', 'really good'],
    ['he is not \uFF02good\uFF02 at all :/', 'good'],
    ['\uFF02quote\uFF02', 'quote'],
    ['\uFF02a quote here\uFF02', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+0027 to U+0027', function (t) {
  [
    ['he is \u0027really good\u0027', 'really good'],
    ['he is \u0027really good\u0027 i guess', 'really good'],
    ['he is not \u0027good\u0027 at all :/', 'good'],
    ['\u0027quote\u0027', 'quote'],
    ['\u0027a quote here\u0027', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});
//
test('Quotations - U+201C to U+201D', function (t) {
  [
    ['he is \u201Creally good\u201D', 'really good'],
    ['he is \u201Creally good\u201D i guess', 'really good'],
    ['he is not \u201Cgood\u201D at all :/', 'good'],
    ['\u201Cquote\u201D', 'quote'],
    ['\u201Ca quote here\u201D', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+2018 to U+2019', function (t) {
  [
    ['he is \u2018really good\u2019', 'really good'],
    ['he is \u2018really good\u2019 i guess', 'really good'],
    ['he is not \u2018good\u2019 at all :/', 'good'],
    ['\u2018quote\u2019', 'quote'],
    ['\u2018a quote here\u2019', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+201F to U+201D', function (t) {
  [
    ['he is \u201Freally good\u201D', 'really good'],
    ['he is \u201Freally good\u201D i guess', 'really good'],
    ['he is not \u201Fgood\u201D at all :/', 'good'],
    ['\u201Fquote\u201D', 'quote'],
    ['\u201Fa quote here\u201D', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+201B to U+2019', function (t) {
  [
    ['he is \u201Breally good\u2019', 'really good'],
    ['he is \u201Breally good\u2019 i guess', 'really good'],
    ['he is not \u201Bgood\u2019 at all :/', 'good'],
    ['\u201Bquote\u2019', 'quote'],
    ['\u201Ba quote here\u2019', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+201E to U+201D', function (t) {
  [
    ['he is \u201Ereally good\u201D', 'really good'],
    ['he is \u201Ereally good\u201D i guess', 'really good'],
    ['he is not \u201Egood\u201D at all :/', 'good'],
    ['\u201Equote\u201D', 'quote'],
    ['\u201Ea quote here\u201D', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+2E42 to U+201D', function (t) {
  [
    ['he is \u2E42really good\u201D', 'really good'],
    ['he is \u2E42really good\u201D i guess', 'really good'],
    ['he is not \u2E42good\u201D at all :/', 'good'],
    ['\u2E42quote\u201D', 'quote'],
    ['\u2E42a quote here\u201D', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+201A to U+2019', function (t) {
  [
    ['he is \u201Areally good\u2019', 'really good'],
    ['he is \u201Areally good\u2019 i guess', 'really good'],
    ['he is not \u201Agood\u2019 at all :/', 'good'],
    ['\u201Aquote\u2019', 'quote'],
    ['\u201Aa quote here\u2019', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+00AB to U+00BB', function (t) {
  [
    ['he is \u00ABreally good\u00BB', 'really good'],
    ['he is \u00ABreally good\u00BB i guess', 'really good'],
    ['he is not \u00ABgood\u00BB at all :/', 'good'],
    ['\u00ABquote\u00BB', 'quote'],
    ['\u00ABa quote here\u00BB', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+2039 to U+203A', function (t) {
  [
    ['he is \u2039really good\u203A', 'really good'],
    ['he is \u2039really good\u203A i guess', 'really good'],
    ['he is not \u2039good\u203A at all :/', 'good'],
    ['\u2039quote\u203A', 'quote'],
    ['\u2039a quote here\u203A', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+2035 to U+2032', function (t) {
  [
    ['he is \u2035really good\u2032', 'really good'],
    ['he is \u2035really good\u2032 i guess', 'really good'],
    ['he is not \u2035good\u2032 at all :/', 'good'],
    ['\u2035quote\u2032', 'quote'],
    ['\u2035a quote here\u2032', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+2036 to U+2033', function (t) {
  [
    ['he is \u2036really good\u2033', 'really good'],
    ['he is \u2036really good\u2033 i guess', 'really good'],
    ['he is not \u2036good\u2033 at all :/', 'good'],
    ['\u2036quote\u2033', 'quote'],
    ['\u2036a quote here\u2033', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+2037 to U+2034', function (t) {
  [
    ['he is \u2037really good\u2034', 'really good'],
    ['he is \u2037really good\u2034 i guess', 'really good'],
    ['he is not \u2037good\u2034 at all :/', 'good'],
    ['\u2037quote\u2034', 'quote'],
    ['\u2037a quote here\u2034', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+301D to U+301E', function (t) {
  [
    ['he is \u301Dreally good\u301E', 'really good'],
    ['he is \u301Dreally good\u301E i guess', 'really good'],
    ['he is not \u301Dgood\u301E at all :/', 'good'],
    ['\u301Dquote\u301E', 'quote'],
    ['\u301Da quote here\u301E', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+0060 to U+00B4', function (t) {
  [
    ['he is \u0060really good\u00B4', 'really good'],
    ['he is \u0060really good\u00B4 i guess', 'really good'],
    ['he is not \u0060good\u00B4 at all :/', 'good'],
    ['\u0060quote\u00B4', 'quote'],
    ['\u0060a quote here\u00B4', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});

test('Quotations - U+301F to U+301E', function (t) {
  [
    ['he is \u301Freally good\u301E', 'really good'],
    ['he is \u301Freally good\u301E i guess', 'really good'],
    ['he is not \u301Fgood\u301E at all :/', 'good'],
    ['\u301Fquote\u301E', 'quote'],
    ['\u301Fa quote here\u301E', 'a quote here']
  ].forEach(a => testAllQuotes(a, t));
  t.end();
});
