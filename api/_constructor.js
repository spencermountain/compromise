module.exports = {
  tokenize: {
    desc: 'parse text into a compromise object, without running POS-tagging ',
    returns: 'Doc',
    example: `nlp.tokenize("you\'re sure you haven\'t just made thousands of mistakes?")`,
  },
  extend: {
    desc: 'mix in a compromise-plugin',
    returns: 'lib',
    example: `nlp.extend((Doc, world)=>world.addWords({bort:'FirstName'}))`,
  },
  clone: {
    desc: 'make a deep-copy of the extended library',
    returns: 'lib',
    example: `let b=nlp.clone(); b.extend((Doc, world)=>{world.addWords({ 'a hoy hoy' : 'Greeting'})})`,
  },
  import: {
    desc: 'load a Doc from .export() json',
    returns: 'Doc',
    example: `let json=nlp('Tony Hawk').export();\nnlp.import(json).match('#Person')`,
  },
  verbose: {
    desc: 'enable debugging mode for pos-tagging',
    returns: 'lib',
    example: `let json=nlp('Tony Hawk').export();\nnlp.import(json).match('#Person')`,
  },
  version: {
    desc: "current version of compromise that's running",
    returns: 'String',
    example: `nlp.version//12.0.1`,
  },
}
