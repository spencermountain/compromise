var nlp = require('./src/index');
// nlp.verbose(true);

var str = `• Spencęr & JOhn™ ⟨lmt⟩.`;
var doc = nlp(str);

console.log(doc.out('text'));
