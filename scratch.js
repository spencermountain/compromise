var nlp = require('./src/index');
// nlp.verbose('tagger');

// let r = nlp.tokenize('my dog\'s name is Levi,');
// r.match('(spencer|levi)').tag('Person'); //your own tagging

nlp('Use a pointed stick (a pencil) or a similar tool').parentheses().debug();
