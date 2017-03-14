//loads and runs compromise inside the worker-instance
self.addEventListener('message', function(e) {
  importScripts('https://unpkg.com/compromise@latest/builds/compromise.min.js');
  var r = self.nlp(e.data);
  var s = r.sentences(0).toUpperCase();
  self.postMessage(s.out('html'));
}, false);
