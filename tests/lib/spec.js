import nlp from './two.js'

// One Tape assertion per spec line; leave t.end() to the caller.
const assertSpec = (t, spec, message = '') => {
  const lines = Array.isArray(spec) ? spec.join('\n') : spec
  lines.split('\n').forEach(line => {
    line = line.trim()
    if (!line || line.startsWith('#')) {
      return
    }
    const failing = nlp.testSpec(line, false)
    const prefix = message ? message + ' ' : ''
    if (failing.failures.length > 0) {
      const words = failing.failures.map(failure => {
        return failure.word ? `'${failure.word}'` : failure.message
      }).join(', ')
      t.fail(prefix + failing.out('spec') + ' - !=' + words)
    } else {
      t.pass(prefix + line)
    }
  })
}

export default assertSpec
