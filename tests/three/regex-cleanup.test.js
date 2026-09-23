import test from 'tape'
import { execFileSync } from 'node:child_process'
import nlp from './_lib.js'
import pluckOut from '../../src/1-one/change/api/lib/remove.js'
import { textFromTerms } from '../../src/1-one/output/api/_text.js'
import isSentence from '../../src/1-one/tokenize/methods/01-sentences/is-sentence.js'

test('regex cleanup: removal repairs only the first qualifying run', t => {
  for (const [post, expected] of [
    ['   x', '   x'], [',,,x', ',,,x'], ['   !', '!'], [',;:!', '!'],
    ['  x  !  ?', '  x!  ?'], [',,x;;!,,?', ',,x!,,?'],
  ]) {
    const document = [[{text: 'one', post}, {text: 'two', post: ''}]]
    pluckOut(document, [[0, 1, 2]])
    t.equal(document[0][0].post, expected, JSON.stringify(post))
  }
  t.end()
})

test('regex cleanup: output and sentence suffixes preserve behavior', t => {
  for (const [post, expected] of [
    [',,,x', 'word,,,x'], [',,,', 'word'], ['—”', 'word'], ['-', 'word '],
    [',\n', 'word,\n'], [' x!!', 'word x'],
  ]) {
    t.equal(textFromTerms([{text: 'word', post, tags: new Set()}], {keepPunct: false}), expected)
  }
  for (const ending of ['..', '...', '…', '..   ', '…  ']) {
    t.notOk(isSentence('word' + ending, {}), `ellipsis ${ending}`)
  }
  for (const ending of ['.', '. ', '..xx', '...xx']) {
    t.ok(isSentence('word' + ending, {}), `not an ellipsis: ${ending}`)
  }
  for (const [text, ending] of [['1001st', 'st'], ['1002nd', 'nd'], ['1003rd', 'rd'], ['1011th', 'th']]) {
    const doc = nlp(text)
    doc.numbers().toLocaleString()
    t.equal(doc.text(), Number.parseInt(text, 10).toLocaleString() + ending, text)
  }
  t.end()
})

test('regex cleanup: bounded stress checks cover the remaining warning sites', t => {
  const root = new URL('../../', import.meta.url).href
  const code = `
    import assert from 'node:assert/strict';
    import nlp from ${JSON.stringify(root + 'src/three.js')};
    import normalize from ${JSON.stringify(root + 'src/1-one/tokenize/methods/03-whitespace/tokenize.js')};
    import * as punctuation from ${JSON.stringify(root + 'src/1-one/tokenize/model/punctuation.js')};
    import {textFromTerms} from ${JSON.stringify(root + 'src/1-one/output/api/_text.js')};
    import isSentence from ${JSON.stringify(root + 'src/1-one/tokenize/methods/01-sentences/is-sentence.js')};
    nlp.parseMatch('!'.repeat(100000) + 'x');
    nlp.parseMatch('('.repeat(100000) + 'x');
    nlp.parseMatch('('.repeat(100000) + 'x)trailing');
    nlp.parseMatch('!'.repeat(100000) + '(red|blue)');
    const text = '!'.repeat(100000) + 'hello';
    const parts = normalize(text, {one: punctuation});
    assert.equal(parts.pre + parts.str + parts.post, text);
    const spaces = ' '.repeat(100000) + '!';
    assert.equal(nlp(spaces).text(), spaces);
    for (const char of [' ', ',']) {
      const doc = nlp('one two');
      const post = char.repeat(100000) + 'x';
      doc.docs[0][0].post = post;
      doc.remove('two');
      assert.equal(doc.docs[0][0].post, post);
    }
    const post = ','.repeat(100000) + 'x';
    assert.equal(textFromTerms([{text:'word', post, tags: new Set()}], {keepPunct:false}), 'word' + post);
    assert.equal(isSentence('a' + '.'.repeat(100000) + 'xx', {}), true);
  `
  t.doesNotThrow(() => execFileSync(process.execPath, ['--input-type=module', '-e', code], {
    timeout: 5000, stdio: 'pipe',
  }), 'rejecting inputs complete and preserve results')
  t.end()
})
