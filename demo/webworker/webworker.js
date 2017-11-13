//loads and runs compromise inside the worker-instance
importScripts('../../builds/compromise.js');

console.log(navigator)
if('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', {
    scope: '/'
  })
    .then((registration) => {
    console.log('success');
});
}

var plugin = {
  "name": "Weather",
  "patterns": {
    // "(weather|temperature|cold|hot|humid(ity)?|wind[sy]|chill$|rain[ying)": "Weather",
    "(interactive|radar|motion) map?": "Navigation",
    "to? (weekend|today|tonight|current|tomorrow) (forecast|weather condition|condition)": "Navigation",
    "san? (francisco|jose)": "Place"
  },
  "regex": {
    "humid(ity)?|rain(y|ing)?|chill(y)?|wind(y)?|hot|cold|snow(y)?|": "Weather"
  },
  "responses": {
    "Navigation": {
      "today|tonight|tomorrow": "https://weather.com/weather/today/l/${geoCode}",
      "weekend": "https://weather.com/weather/weekend/l/${geoCode}",
      "interactive|radar|motion": "https://weather.com/weather/radar/interactive/l/${geoCode}?animation=true",
      "five|5 day|ten day|ten|10 day|ten day|monday|tuesday|wednesday|thursday|friday|saturday|sunday": "https://weather.com/weather/tenday/l/${geoCode}"
    }
  }
};

nlp.plugin(plugin);
self.addEventListener('message', function(e) {
  var r = self.nlp(e.data.payload);
  console.log(e.data.type, r);
  switch(e.data.type) {
    case 'topics':
      // var s = r.topics();
      // self.postMessage(s.out('html'));
      self.postMessage(r.debug());
      break;
    case 'places':
      // console.log(r.list[0].terms[5].tags)
      var s = r.list;
      s.forEach((sentence, i) => {
        console.log('test', r.sentences(i).places().data())
        console.log('test', sentence.world.responses.find('Navigation', s));
      });
      self.postMessage(r.places().data());
      break;
    default:
      var s = r.sentences(1).toUpperCase();
      console.log('sentences', r.sentences().data());
      self.postMessage(s.out('html'));
  }
}, false);
