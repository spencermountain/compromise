var nlp = require('./src/index');
// nlp.verbose(true);

let doc = nlp(':cool: :wine_glass: yeah party');
console.log(doc.match('#Emoji').debug().normal());
