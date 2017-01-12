self.addEventListener('message', function(e) {
  importScripts('../builds/compromise.js');
  var str = e.data;
  var r = self.nlp(str).toUpperCase();
  self.postMessage(r.out('html'));
}, false);
