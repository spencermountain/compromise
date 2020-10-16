// walked => walk  - turn a verb into it's root form
const toInfinitive = function (parsed, world) {
  let verb = parsed.verb
  // console.log(parsed)
  // verb.debug()

  //1. if it's already infinitive
  let str = verb.text('reduced')
  if (verb.has('#Infinitive')) {
    return str
  }

  // 2. world transform does the heavy-lifting
  let tense = null
  if (verb.has('#PastTense')) {
    tense = 'PastTense'
  } else if (verb.has('#Gerund')) {
    tense = 'Gerund'
  } else if (verb.has('#PresentTense')) {
    tense = 'PresentTense'
  } else if (verb.has('#Participle')) {
    tense = 'Participle'
  } else if (verb.has('#Actor')) {
    tense = 'Actor'
  }
  return world.transforms.toInfinitive(str, world, tense)
}
module.exports = toInfinitive
