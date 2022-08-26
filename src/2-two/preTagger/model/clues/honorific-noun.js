const h = 'Honorific'

// repeating honorific words
let r = {
  first: h,
  general: h,
  royal: h,
  vice: h,
  rear: h,
  major: h,
}
export default {
  beforeTags: { Honorific: h },
  afterTags: { Person: h },
  beforeWords: r,
  afterWords: r,
}