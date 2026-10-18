import test from 'tape'
import nlp from '../_lib.js'
const here = '[dates/tagger/date-chunk] '

test(here + 'date-chunk :', function (t) {
  const arr = [
    ['remember to buy eggs tomorrow', 'tomorrow'],
    ['i should buy eggs for the kids on sunday', 'on sunday'],
    ['please tell john to walk the dogs each night', 'each night'],
    ["i've gotta buy some paint for the ceiling on monday", 'on monday'],
    ['all the books need to be brought back by tuesday', 'by tuesday'],
    ['bring the paint cans to the dump with johnny on tuesday', 'on tuesday'],
    ['vote on tuesday', 'on tuesday'],
    ['hey spencer, i gotta get my homework finished tonight', 'tonight'],
    ['sell the hotdogs at wrigley on friday', 'on friday'],
    ['remind me to drive to waterloo on thursday night', 'on thursday night'],
    ['reply to all my emails in the morning', 'in the morning'],
    ["keep tabs on danny this week and ensure he's ok with sandra", 'this week'],
    ['please tell me to upload the spreadsheet for danny on friday', 'on friday'],
    ['saturday date with sandra', 'saturday'],
    ['lunch with Dr. Salvonio on tuesday at 10', 'on tuesday at 10'],
    ['work-out tomorrow', 'tomorrow'],
    ['book club every wednesday', 'every wednesday'],
    ['@spencer tell me to buy cheeseburgers tuesday night for everybody', 'tuesday night'],
    ["i'd like to watch the space shuttle launch tonight", 'tonight'],
    ['forge a relationship with the investors over christmas', 'over christmas'],
    // ['in august, buy june some flowers', 'in august,'],
    ['by february, tell new users we accept donations', 'by february'],
    ['eat carrots once a week', 'once a week'],
    ['set alarm next tuesday', 'next tuesday'],
    ['yo, check my stocks in the morning', 'in the morning'],
    ['pack a lunch for danny and sam on sunday morning', 'on sunday morning'],
    ['check the mailbox in the morning', 'in the morning'],
    ['take out the garbage every thursday', 'every thursday'],
    ['use-case analysis project due by friday', 'due by friday'],
    ['this tuesday, buy a new microphone', 'this tuesday'],
    ["grab a new monitor when i'm shopping next weekend", 'next weekend'],
    ["i gotta pay rent friday. don't let me forget", 'friday'],
    ['make sure the chores are done by tuesday', 'by tuesday'],
    ['help hunter with the golf clubs this coming monday', 'this coming monday'],
    ['set all dials to repeat mode after this weekend', 'after this weekend'],
    ['wash the floor each week after new years', 'each week after new years'],
    ['post a tweet about consumerism on april fools day', 'on april fools day'],
    ['all the bills are what I need to pay by tuesday', 'by tuesday'],
  ]
  arr.forEach(function (a) {
    const str = nlp(a[0])
      .match('#Date+')
      .out('reduced')
    t.equal(str, a[1], a[0])
  })
  t.end()
})

test(here + 'a trailing dash is not part of the date', (t) => {
  const context = {
    today: '2026-07-11', //saturday
    timezone: 'America/New_York',
  }
  const doc = nlp('2025-05-11 - They have taken the bridge and the Second Hall')
  t.equal(doc.dates(context).text(), '2025-05-11', 'iso date before a dash')
  t.equal(nlp('june 5 - june 7').dates(context).text(), 'june 5 - june 7', 'dash range')

  t.end()
})
