import canBeTerm from '../../../tag/methods/canBe.js'

// is this tag consistent with the tags they already have?
const canBe = (terms, tag, model) => terms.every(term => canBeTerm(term, tag, model.one.tagSet))
export default canBe
