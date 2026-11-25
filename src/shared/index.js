// language-neutral plugins, for reuse by other builds and languages

// ===/two==
export { default as lazy } from '../2-two/lazy/plugin.js'
// the english tagset, for use as { tags: { ...tagSet } }
export { default as tagSet } from '../2-two/preTagger/tagSet/index.js'

// ===/three==
// persons(), places() organizations()
export { default as topics } from '../3-three/topics/plugin.js'
// .redact()
export { default as redact } from '../3-three/redact/plugin.js'
// acronyms(), parentheses()
export { default as misc } from '../3-three/misc/plugin.js'
// .clauses()
export { default as clauses } from '../3-three/clauses/plugin.js'

// ==/shared==
// used for testing
export { default as checkSpec } from './spec/plugin.js'
// efrt-packed names of people and places, keyed by tag
export { default as properNouns } from './_built/properNouns.js'
