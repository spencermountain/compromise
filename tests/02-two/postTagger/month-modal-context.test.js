import test from 'tape'
import nlp from '../lib.js'
const here = '[two/postTagger/month-modal-context] '

const notMonth = (t, doc, word, str) => {
  const m = doc.match(word)
  t.equal(m.found, true, here + `found: '${str}'`)
  t.notOk(m.has('#Month'), here + `not a month: '${str}'`)
  t.notOk(m.has('#Date'), here + `not a date: '${str}'`)
}

test('may beside a date word is a modal', function (t) {
  const arr = [
    // date word before
    'Tomorrow may be better.',
    'Monday may be busy.',
    'Today may be the day.',
    'Next week may be better.',
    'Monday may not work.',
    'Tomorrow may also be fine.',
    'The day may have come.',
    'The week may seem long.',
    'Tomorrow he may leave.',
    'On Monday we may leave.',
    'In 2020 they may leave.',
    'By 2020 may be too late.',
    '2020 may be the year.',
    'The year 2020 may be the best.',
    'Tomorrow, may I go?',
    // date word after
    'You may leave tomorrow.',
    'We may go Monday.',
    'He may call tomorrow.',
    'It may rain today.',
    'It may take years.',
    'It may this year.',
    'May I go tomorrow?',
    // this, next, last
    'This may be true.',
    'This may not be an easy conversation.',
    'This may also be true.',
    // as, than
    'as may be necessary',
    'as may suffice for now',
    'more than may be expected',
  ]
  arr.forEach(str => {
    const doc = nlp(str)
    notMonth(t, doc, 'may', str)
    t.ok(doc.match('may').has('#Modal'), here + `modal: '${str}'`)
  })
  t.end()
})

test('march beside a date word is not a month', function (t) {
  const arr = [
    'Tomorrow we march on.',
    'On Monday we march.',
    'They march tomorrow.',
    'We march Monday.',
    'They march on Monday.',
    'They march to Monday.',
    'The soldiers march on Monday.',
    'The soldiers march tomorrow.',
  ]
  arr.forEach(str => {
    notMonth(t, nlp(str), 'march', str)
  })
  t.end()
})

test('the month reading is kept', function (t) {
  const arr = [
    ['June and may', 'may'],
    ['June to march', 'march'],
    ['feb to march', 'march'],
    ['from January through March', 'March'],
    ['Monday, March 5', 'March'],
    ['Monday May 5th', 'May'],
    ['tomorrow in may', 'may'],
    ['last year in March', 'March'],
    ['In 2020 may was hot.', 'may'],
    ['2020 may 5', 'may'],
    ['March and feb', 'March'],
    ['may and june', 'may'],
    ['may to june', 'may'],
    ['march through june', 'march'],
    ['March 2020', 'March'],
    ['May 2020', 'May'],
    ['March of 2020', 'March'],
    ['may in 2020', 'may'],
    ['May this year was hot.', 'May'],
    ['May that year was hot.', 'May'],
    ['the period March to May that year', 'May'],
    ['march next year', 'march'],
    ['may last year', 'may'],
    ['March on Monday', 'March'],
    ['in March next year', 'March'],
    ['5pm may 5', 'may'],
    // a pronoun can start the next clause
    ['Last May I went home.', 'May'],
    ['Next May we leave.', 'May'],
    ['This May we left.', 'May'],
    ['In May I went home.', 'May'],
    ['In May leave was granted.', 'May'],
    ['As May approaches', 'May'],
    ['On 5 May I went home.', 'May'],
    ['On 12 March we left.', 'March'],
    // a following noun, or nothing
    ['Results March 2020', 'March'],
    ['this may', 'may'],
    ['last may', 'may'],
  ]
  arr.forEach(([str, word]) => {
    t.ok(nlp(str).match(word).has('#Month'), here + `month: '${str}'`)
  })
  t.end()
})
