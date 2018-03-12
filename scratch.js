var nlp = require('./src/index');
nlp.verbose('tagger');

// nlp(`\u2039Here be Quote\u2019s quotes\u203A`).debug();
// nlp(`\u201AHere be quotes\u2019`).debug();
//nlp(`\u201Atwas Carlos\u2019`).debug();
//nlp(`\u201A"Really", he said\u2019, She said, they all laughed.\u2019`).debug();
//nlp(`\u201A"Really"\u2019`).debug();
//nlp('It was a really long walk').contractions().contract().all().debug();
//nlp('\'twas a really long walk').contractions().expand().all().debug();

//nlp('My "String" "with many" adjacent "nested" \'quotes\'').debug()
t = nlp(`"May's" 'third day' 'will be a "really cold" day' "in a" 'really cold "month"'`).quotations().out('array')
//.debug()
console.log(t);

[
    "may's",
    'third day',
    'will be a really cold day',
    'really cold',
    'in a',
    'really cold month',
    'month'
]