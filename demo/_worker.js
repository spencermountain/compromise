//loads and runs compromise inside the worker-instance
self.addEventListener(
  'message',
  function(e) {
    // importScripts('https://unpkg.com/compromise@next')
    importScripts('../builds/compromise.js')
    let doc = self.nlp(e.data)
    let m = doc.places()
    self.postMessage(m.json({ count: true, unique: true }))
  },
  false
)
