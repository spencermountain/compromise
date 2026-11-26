// Compile-only consumer test for every export of the shared entry.
import nlp from 'compromise/one'
import { lazy, topics, redact, misc, clauses, checkSpec, properNouns, tagSet } from 'compromise/shared'

const plugins = [lazy, topics, redact, misc, clauses, checkSpec]
plugins.forEach(plugin => nlp.plugin(plugin))
nlp.plugin({ tags: { ...tagSet } })
const packed: string = properNouns.City
packed.split('|')
