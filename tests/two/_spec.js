import nlp from './_lib.js'

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
    const failed = failing.failures.length > 0
    const label = failed ? failing.out('spec') : line
    t.equal(failed, false, prefix + label)
  })
}

export default assertSpec
