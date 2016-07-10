'use strict'
//just a helper file for file paths..
let files = {
  'names': [
    'female',
    'firstnames',
    'male',
  ],
  'nouns': [
    'abbreviations',
    'currencies',
    'dates',
    'demonyms',
    'holidays',
    'honourifics',
    'irregular_nouns',
    'numbers',
    'organizations',
    'places',
    'professions',
    'uncountables',
  ],
  'verbs': [
    'irregular_verbs',
    'phrasal_verbs',
    'verbs',
  ]
}
let data = {
  'misc': require('./misc'),
  'multiples': require('./multiples')
}
Object.keys(files).forEach((k) => {
  files[k].forEach((s) => {
    data[s] = require('./' + k + '/' + s)
  })
})
module.exports = data
