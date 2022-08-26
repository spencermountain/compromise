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
  beforeTags: {
    Honorific: h,
    ProperNoun: h, //Foo jr 
    Ordinal: h //second admiral
  },
  afterTags: {
    Person: h,
    ProperNoun: h //captain Foo
  },
  beforeWords: Object.assign({}, r, {
    honorable: h,
    honourable: h,
    worship: h,
    excellency: h,
    majesty: h,
    right: h,
  }),
  afterWords: r,
}