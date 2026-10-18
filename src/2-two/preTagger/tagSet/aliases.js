import compileAliases from '../../../1-one/tag/_aliases.js'
import tagSet from './index.js'

// Canonical names for static English models; plugins compile their own lookup.
const aliases = compileAliases(tagSet)

export default aliases
