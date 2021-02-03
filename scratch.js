const nlp = require('./src/index')
nlp.extend(require('./plugins/sentences/src'))
// nlp.verbose(true)

//
//
//
//
//
//
//

// let doc = nlp('before three farms after')
// let reg = nlp.parseMatch(`before (#Value .) after`)
// // console.log(JSON.stringify(reg, null, 2))
// doc.match(reg).debug()

// #801
// nlp('79-years-old').debug()
// nlp('foo-bar').match('@hasDash').debug()

// #802
// nlp('are you available').sentences().toFutureTense().debug()

// #737
// nlp('i am being driven').sentences().toPastTense().debug()
// nlp('i should drive').sentences().toFutureTense().debug()
// nlp('i should have been driven').sentences().toFutureTense().debug()
