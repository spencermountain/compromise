import tagWords from '../_lib.js'
import tags from '../../tagSet/aliases.js'

const { Unit: un } = tags
// '5 oz'   -  'dr oz'
const clues = {
  beforeTags: { Value: un },
  afterTags: {},
  beforeWords: tagWords(
    // square km; metric ton
    'per every each square cubic sq metric', un,
  ),
  afterWords: tagWords(
    // foot long
    'per squared cubed long', un,
  ),
}
export default clues