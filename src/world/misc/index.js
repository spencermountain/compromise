// here, we grab things from around the repo.
// these are words that aren't packed with efrt, in ../_data.js
// (for whatever reasons)

//words with numbers
const misc = require('./misc')

//period-abbreviations, like 'blvd'
const abbreviations = require('../../tokenizer/lib/abbreviations')

//organization forms, like 'academy'
const orgWords = require('../../tagger/04-inference/data/orgWords')

//irregular adjective conjugations
// const adjectives = require('../../01-doc/selections/adjectives/irregulars').lexicon;

const result = Object.assign({}, misc, abbreviations, orgWords)
module.exports = result
