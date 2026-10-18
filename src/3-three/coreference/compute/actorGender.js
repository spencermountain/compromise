import pluralPhrase from './pluralPhrase.js'

const male = new Set('man boy father dad son brother uncle husband boyfriend grandfather king prince sultan'.split(' '))
const female = new Set('woman girl mother mom mum daughter sister aunt wife girlfriend grandmother queen princess lady'.split(' '))

// Common nouns encode grammatical gender without a named-person selection.
const compatibleActor = (person, gender) => {
  const head = person.splitBefore('#Preposition').first()
  if (pluralPhrase(head)) {
    return false
  }
  const actor = head.match('#Actor').last().text('normal').replace(/['’]s$/, '')
  const opposite = gender === 'm' ? female : male
  return !opposite.has(actor)
}

export default compatibleActor
