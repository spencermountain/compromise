// language-neutral plugins, for reuse by other builds and languages

// ===/two==
export { default as lazy } from '../2-two/lazy/plugin.js'
export { default as swap } from '../2-two/swap/plugin.js'

// ===/three==
// persons(), places() organizations()
export { default as topics } from '../3-three/topics/plugin.js'
// .redact()
export { default as redact } from '../3-three/redact/plugin.js'
// acronyms(), parentheses()
export { default as misc } from '../3-three/misc/plugin.js'

// ==/shared==
// used for testing
export { default as checkSpec } from './spec/plugin.js'
// cross-language lexicon info
export { default as properNouns } from './proper-nouns/index.js'
