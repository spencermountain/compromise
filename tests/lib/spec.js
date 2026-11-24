import nlp from '../02-two/lib.js'
import { checkSpec } from '../../src/shared/index.js'
nlp.plugin(checkSpec)

// One Tape assertion per spec line; leave t.end() to the caller.
const assertSpec = (t, spec, message = '') => {
  const prefix = message ? message + ' ' : ''
  nlp.checkSpec([spec].flat().join('\n')).forEach(res => {
    if (res.status !== 'fail') {
      const block = res.tags ? ` {${res.tags.join(',')}}` : ''
      t.pass(prefix + res.text + block)
      return
    }
    const words = res.failures.map(failure => `'${failure.word || failure.want}'`).join(', ')
    t.fail(prefix + nlp(res.text).out('spec') + ' - !=' + words)
  })
}

export default assertSpec
