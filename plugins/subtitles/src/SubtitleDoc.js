import WrapDoc from './WrapDoc.js'

// a blank line would end the cue early, and corrupt the file
const toLines = str => {
  return str
    .split('\n')
    .map(line => line.trim())
    .filter(line => line)
}

/** a doc for each cue in a subtitle file */
class SubtitleDoc extends WrapDoc {
  constructor(views, vtt) {
    super(views)
    this.vtt = vtt
  }
  update(views) {
    return new SubtitleDoc(views, this.vtt)
  }
  // timing and labels - .cues[i] is the data for .views[i]
  get cues() {
    return this.vtt.json()
  }
  /** produce the whole subtitle file, including any changes to the text */
  toSubtitle(opts) {
    this.cues.forEach((cue, i) => {
      cue.text = toLines(this.views[i].all().text())
    })
    return this.vtt.out(opts)
  }
}

export default SubtitleDoc
