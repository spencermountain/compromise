import { green, red, dim } from '../../API/_color.js'
import specFailures from './_spec-failures.js'
import logSpec from './_spec-log.js'
import { parseLine, toMatchString, applyTags } from './_spec-lib.js'

const fromSpec = function (spec, { tags: tagMode = 'ignore', failures: failureMode = 'ignore', verbose = false } = {}) {
  if (!['ignore', 'use'].includes(tagMode) || !['ignore', 'throw', 'retain', 'log'].includes(failureMode)) {
    throw new Error('Invalid fromSpec options')
  }
  const aliases = this.world().model.one.tagAliases
  const result = this('')
  result.failures = []
  spec.split('\n').forEach((line, index) => {
    if (!line.trim() || /^\s*#/.test(line)) {
      return
    }
    const { text, tags } = parseLine(line)
    const doc = tagMode === 'use' ? this.tokenize(text) : this(text)
    let failures = []
    if (tags !== null && (tagMode === 'use' || failureMode !== 'ignore')) {
      const count = doc.docs.reduce((sum, terms) => sum + terms.length, 0)
      const patterns = tags.map(slot => toMatchString([slot], aliases))
      const pattern = toMatchString(tags, aliases)
      // Assigning slots is unsafe when the shape or syntax is invalid.
      const canApply = count === tags.length && pattern !== null
      if (tagMode === 'use' && !canApply && failureMode !== 'log') {
        const invalid = specFailures(doc, tags, patterns, aliases)
        throw new Error(`${text.trim()} - ${invalid.map(failure => failure.message).join('; ')}`)
      }
      if (tagMode === 'use') {
        applyTags(doc, canApply ? tags : null, aliases)
      }
      if (failureMode !== 'ignore' && (count !== tags.length || pattern === null || !doc.has(pattern))) {
        failures = specFailures(doc, tags, patterns, aliases)
          .map(failure => ({ line: index + 1, text: text.trim(), ...failure }))
        result.failures.push(...failures)
      }
    } else if (tagMode === 'use') {
      applyTags(doc, null, aliases)
    }
    const detail = failures.map(failure => failure.message).join('; ')
    if (failureMode === 'log' && failures.length > 0) {
      console.error(logSpec(doc, tags, failures, aliases)) //eslint-disable-line no-console
    } else if (verbose) {
      const block = tags === null ? '' : ` {${tags.map(slot => slot.join('|')).join(',')}}`
      if (failures.length > 0) {
        console.log(`${red('✗')} ${text}${dim(block)} - ${red(detail)}`) //eslint-disable-line no-console
      } else {
        console.log(`${green('✓')} ${green(dim(text))}${dim(block)}`) //eslint-disable-line no-console
      }
    }
    if (failures.length > 0 && failureMode === 'throw') {
      throw new Error(`${text.trim()} - ${detail}`)
    }
    if (failureMode === 'retain' && tags !== null && failures.length === 0) {
      return
    }
    // Preserve the parsed terms and assigned tags, without running hooks twice.
    if (doc.found) {
      const previous = result.document.at(-1)?.at(-1)
      if (previous) {
        previous.post += '\n'
      }
      result.document.push(...doc.docs)
    }
  })
  return result
}

// Keep the legacy logging and throwing arguments on the compatibility wrapper.
const testSpec = function (spec, verbose = true, throwError = false) {
  const result = this.fromSpec(spec, { tags: 'ignore', failures: 'retain', verbose })
  if (throwError && result.failures.length > 0) {
    const failure = result.failures[0]
    throw new Error(`${failure.text} - ${failure.message}`)
  }
  return result
}

export { fromSpec, testSpec }
