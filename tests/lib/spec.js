import nlp from '../02-two/lib.js'
import { checkSpec } from '../../src/shared/index.js'
nlp.plugin(checkSpec)

// One Tape assertion per spec line; leave t.end() to the caller.
const assertSpec = (t, spec, prefix) => nlp.assertSpec(t, spec, prefix)

export default assertSpec
