// Compile-only consumer test for the esm-only shared export.
import nlp from 'compromise/one'
import { checkSpec } from 'compromise/shared'
import type { SpecCheck } from 'compromise/shared'

nlp.plugin(checkSpec)
const list: SpecCheck[] = []
list.map(res => res.failures.map(failure => failure.index))
