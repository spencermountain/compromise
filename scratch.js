'use strict';
var nlp = require('./src/index');
// nlp.verbose('tagger');
// const fresh = require('./test/unit/lib/freshPrince.js');

var text = `saying, “He is a good guy and has been through a lot” fun.`;
// He repeated that Flynn hadn’t done anything wrong on his calls with the Russians, but had misled the Vice President. He then said, “I hope you can see your way clear to letting this go, to letting Flynn go. He is a good guy. I hope you can let this go.” I replied only that “he is a good guy.” (In fact, I had a positive experience dealing with Mike Flynn when he was a colleague as Director of the Defense Intelligence Agency at the beginning of my term at FBI.) I did not say I would “let this go."`;

var doc = nlp(text);
doc.debug();
console.log(doc.quotations().data());
