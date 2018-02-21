var nlp = require('./src/index');
// nlp.verbose('tagger');


nlp('I met John Smith in Toronto and we ate shellfish at 23 Main st.').debug();
