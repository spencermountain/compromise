import test from 'tape'
import nlp from '../_lib.js'

// Explicit expectations for the representative text from the parser audit.
// Pipes require both tags; a dot leaves an unrelated term unspecified.
const examples = [
  ['John Smith', 'FirstName LastName'],
  ['Dr. Jane Smith', 'Honorific FirstName LastName'],
  ['Toronto Raptors', 'SportsTeam SportsTeam'],
  ['Canadian bacon', 'Demonym Noun'],
  ['Canadians are here.', 'Demonym|Plural Copula Noun'],
  ['the Netherlands', 'Determiner Country'],
  ['CPU CPUs', 'Acronym Acronym|Plural'],
  ['@alice', 'AtMention|Person'],
  ['I love #hiking.', 'Pronoun Infinitive HashTag|Gerund'],
  ['123 Main Street', 'Address|NumericValue Address Address'],
  ['(555) 123-4567', 'PhoneNumber PhoneNumber'],
  ['alice@example.com', 'Email'],
  ['https://example.com', 'Url'],
  ['🥳 :-)', 'Emoji Emoticon'],
  ['May 5, 2020', 'Month NumericValue|Date Year|NumericValue'],
  ['May I go?', 'Modal Pronoun Infinitive'],
  ['3pm EST', 'Time Timezone'],
  ['two weeks', 'Cardinal Duration|Plural'],
  ['3-4', 'NumberRange|NumericValue NumberRange|Conjunction NumberRange|NumericValue'],
  ['3-4pm', 'NumberRange|Time NumberRange|Conjunction NumberRange|Time'],
  ['10km', 'NumericValue Unit'],
  ['20mins', 'NumericValue Unit'],
  ['five hundred dollars', 'Money Money Currency'],
  ['5%', 'Percent|NumericValue'],
  ['1/2', 'Fraction|NumericValue'],
  ['Chapter XIV', 'Noun RomanNumeral'],
  ['love/hate', 'SlashedTerm|Verb'],
  ['and/or', 'SlashedTerm|Conjunction'],
  ['well-known', 'Hyphenated|Adverb Hyphenated|Adjective'],
  ['non-smoker', 'Hyphenated|Negative Hyphenated|Noun'],
  ['co write', 'Prefix|Verb Infinitive'],
  ['She has been walking.', 'Pronoun Auxiliary Auxiliary Gerund'],
  ["She didn't leave.", 'Pronoun Auxiliary Negative Infinitive'],
  ['He cannot swim.', 'Pronoun Modal Negative Infinitive'],
  ['She is happy.', 'Pronoun Copula Adjective'],
  ['She was swimming.', 'Pronoun Auxiliary Gerund'],
  ['The roses were watered.', 'Determiner Noun Auxiliary PastTense|Passive'],
  ['Where did you park?', 'QuestionWord PastTense Pronoun Infinitive'],
  ['She turned down the invitation.', 'Pronoun PhrasalVerb Particle Determiner Noun'],
  ['She has no money.', 'Pronoun Verb Negative Uncountable'],
  ['If it rains, stay home.', 'Condition Pronoun PresentTense . Noun'],
  ['There is a problem.', 'There Copula Determiner Noun'],
  // Regressions discovered by the audit: these infinitives need PresentTense.
  ['They attend.', 'Pronoun Infinitive|PresentTense'],
  ['transcend', 'Infinitive|PresentTense'],
  ['The dog is nice. They attend.', 'Determiner Noun Copula Adjective Pronoun Infinitive|PresentTense'],
]

test('representative parser text', function (t) {
  examples.forEach(([text, expected]) => {
    const terms = nlp(text).termList()
    const slots = expected.split(' ')
    const differences = []
    if (terms.length !== slots.length) {
      differences.push(`expected ${slots.length} terms, got ${terms.length}`)
    }
    slots.forEach((slot, i) => {
      if (slot === '.') return
      const missing = slot.split('|').filter(tag => !terms[i]?.tags.has(tag))
      if (missing.length) {
        differences.push(`term ${i + 1} '${terms[i]?.implicit || terms[i]?.text || ''}' missing ${missing.join(', ')}`)
      }
    })
    t.deepEqual(differences, [], '[two/representative-text] ' + text)
  })
  t.end()
})
