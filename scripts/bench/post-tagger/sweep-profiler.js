import { performance } from 'node:perf_hooks'

// Instrument real calls; close() restores the runtime methods.
const createSweepProfiler = (nlp, groups, { timing = false } = {}) => {
  const methods = nlp.world().methods.one
  const original = { match: methods.match, bulkMatch: methods.bulkMatch, bulkTagger: methods.bulkTagger }
  const rows = new Map()
  const actions = new Map()
  let active = null
  groups.forEach(({ name, rules }) => {
    rules.forEach((rule, i) => {
      rows.set(rule, {
        id: `${name}:${i + 1}`, match: rule.match, reason: rule.reason,
        attempts: 0, misses: 0, changedTerms: 0, missMs: 0, noTagAttempts: 0,
      })
    })
  })
  methods.match = function (docs, rule, ...args) {
    const row = active && rows.get(rule)
    const start = timing && row ? performance.now() : 0
    const result = original.match.call(this, docs, rule, ...args)
    if (row) {
      row.attempts += 1
      if (!result.ptrs.length) {
        row.misses += 1
        row.noTagAttempts += 1
        if (timing) {
          row.missMs += performance.now() - start
        }
      }
    }
    if (active) {
      const attempt = row ? { row, remaining: 0, changed: false } : null
      for (let i = 0; i < result.ptrs.length; i += 1) {
        active.push(attempt)
      }
    }
    return result
  }
  methods.bulkMatch = function (...args) {
    const previous = active
    const queue = []
    active = queue
    try {
      const found = original.bulkMatch.apply(this, args)
      for (let i = 0; i < found.length; i += 1) {
        const attempt = queue[i]
        if (attempt) {
          attempt.remaining += 1
          actions.set(found[i], attempt)
        }
      }
      return found
    } finally {
      active = previous
    }
  }
  methods.bulkTagger = function (list, document, world) {
    if (!list.some(todo => actions.has(todo))) {
      return original.bulkTagger.call(this, list, document, world)
    }
    const result = []
    for (let i = 0; i < list.length; i += 1) {
      const todo = list[i]
      const attempt = actions.get(todo)
      if (!attempt) {
        result.push(...original.bulkTagger.call(this, [todo], document, world))
        continue
      }
      const terms = methods.getDoc([todo.pointer], document)[0]
      const before = terms.map(term => Array.from(term.tags))
      // Preserve action order and the real tagger's frozen/safe checks.
      result.push(...original.bulkTagger.call(this, [todo], document, world))
      for (let j = 0; j < terms.length; j += 1) {
        if (before[j].length !== terms[j].tags.size || before[j].some(tag => !terms[j].tags.has(tag))) {
          attempt.row.changedTerms += 1
          attempt.changed = true
        }
      }
      attempt.remaining -= 1
      if (!attempt.remaining && !attempt.changed) {
        attempt.row.noTagAttempts += 1
      }
      actions.delete(todo)
    }
    return result
  }
  return {
    report: () => Array.from(rows.values(), row => ({ ...row })),
    close: () => {
      Object.assign(methods, original)
      actions.clear()
    },
  }
}

export { createSweepProfiler }
