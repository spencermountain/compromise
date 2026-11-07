import methods from '../../../1-one/match/methods/termMethods.js'

const { isUpperCase } = methods

// a comma, semicolon, or colon ends the phrase
const hasBreak = term => methods.hasComma(term) || methods.hasSemicolon(term) || methods.hasColon(term)

// 'The', or 'THE'
const isCapital = term => methods.isTitleCase(term) || isUpperCase(term)

// "bob's"
const hasApostrophe = /'/

export { hasBreak, isCapital, isUpperCase, hasApostrophe }
