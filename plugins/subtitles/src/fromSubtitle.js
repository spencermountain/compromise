import vttpeg from 'vttpeg'
import SubtitleDoc from './SubtitleDoc.js'

// a new speaker, rather than a long line wrapping around
const newSpeaker = /^(?:[-–—]|>>)/
// broadcast captions mark a speaker like this, and the tagger would read it as a word
const speakerMark = /^>{2,}\s*(?=\S)/

// the lines of a cue are only display-wrapping, so they are parsed as one text.
// each wrap is kept as whitespace on the term before it, so it's written back out the same
const parseLines = function (nlp, lines) {
  let str = ''
  const wraps = new Set()
  const marks = new Map()
  lines.forEach((line, i) => {
    if (i > 0 && newSpeaker.test(line)) {
      str += '\n'
    } else if (i > 0) {
      wraps.add(str.length)
      str += ' '
    }
    const mark = line.match(speakerMark)?.[0] || ''
    if (mark) {
      marks.set(str.length, mark)
    }
    str += line.slice(mark.length)
  })
  const doc = nlp(str)
  let pos = 0
  doc.docs.flat().forEach(term => {
    const start = pos
    pos += term.pre.length + term.text.length + term.post.length
    if (marks.has(start)) {
      term.pre = marks.get(start) + term.pre
    }
    if (wraps.has(pos - 1) && term.post.endsWith(' ')) {
      term.post = `${term.post.slice(0, -1)}\n`
    }
  })
  return doc
}

/** parse a subtitle file, into a doc for each cue */
const fromSubtitle = function (txt) {
  const vtt = vttpeg(txt)
  const views = vtt.json().map(cue => parseLines(this, cue.text))
  // a file with no cues still needs one doc to wrap
  if (views.length === 0) {
    views.push(this(''))
  }
  return new SubtitleDoc(views, vtt)
}

export default fromSubtitle
