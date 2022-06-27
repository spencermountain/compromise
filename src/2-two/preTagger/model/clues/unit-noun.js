// '5 oz'   -  'dr oz'
let un = 'Unit'
const clues = {
  beforeTags: { Value: un },
  afterTags: {},
  beforeWords: { per: un, every: un, each: un, square: un, cubic: un, sq: un },
  afterWords: { per: un, squared: un, cubed: un },
}
export default clues