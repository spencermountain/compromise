
const variables = {
  // 'amusing'
  'Adj|Gerund': (str, lex) => {
    lex[str] = 'Adjective'
  },
  // 'standard'
  'Adj|Noun': (str, lex) => {
    lex[str] = 'Adjective'
  },
  // 'boiled'
  'Adj|Past': (str, lex) => {
    lex[str] = 'Adjective'
  },
  // 'smooth'
  'Adj|Present': (str, lex) => {
    lex[str] = 'Adjective'
  },
  // 'box'
  'Noun|Verb': (str, lex) => {
    lex[str] = 'Singular'
  },
  //'singing'
  'Noun|Gerund': (str, lex) => {
    lex[str] = 'Gerund'
  },
  // 'hope'
  'Person|Noun': (str, lex) => {
    lex[str] = 'Noun'
  },
  // 'April'
  'Person|Date': (str, lex) => {
    lex[str] = 'Month'
  },
  // 'rob'
  'Person|Verb': (str, lex) => {
    lex[str] = 'Verb'
  },
  // 'boxes'
  'Plural|Verb': (str, lex) => {
    lex[str] = 'Plural'
  },
}
export default variables