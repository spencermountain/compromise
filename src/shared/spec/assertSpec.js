// one assertion per spec line, for any test object with .pass() and .fail() - like tape
const assertSpec = function (t, spec, prefix = '') {
  this.checkSpec([spec].flat().join('\n')).forEach(res => {
    if (res.status !== 'fail') {
      const block = res.tags ? ` {${res.tags.join(',')}}` : ''
      t.pass(prefix + res.text + block)
      return
    }
    // show the actual tagging, then the words or slots at fault
    const words = res.failures.map(failure => `'${failure.word || failure.want}'`).join(', ')
    t.fail(prefix + this(res.text).out('spec') + ' - !=' + words)
  })
}

export default assertSpec
