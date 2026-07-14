import redact from './redact.js'

const plugin = {
  model: {
    one: {
      tagSet: {
        Redacted: true
      }
    }
  },
  api: function (View) {
    View.prototype.redact = redact
  }
}
export default plugin
