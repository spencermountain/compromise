//loads and runs compromise inside the worker-instance
self.addEventListener('message', function(e) {
  importScripts('../builds/compromise.js');
  var r = self.nlp(e.data);
  r.toUpperCase();
  self.postMessage(r.out('html'));
}, false);
