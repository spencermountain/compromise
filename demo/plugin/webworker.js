//loads and runs compromise inside the worker-instance
importScripts('https://unpkg.com/compromise@latest/builds/compromise.min.js');

var plugin = {
  "name": "examples",
  "patterns": {
    "(weather|temperature|cold|hot|humid(ity)?|wind[sy]|chill$|rain[ing|y])": "Weather",
    "(interactive|radar|motion) map?": "Navigation",
    "(weekend|today|tonight|current|tomorrow) (forecast|conditions|condition|weather)?": "Navigation",
    "(readme|instructions|instruction)": "Navigation",
    "san? (francisco|jose)": "Place"
  },
  "regex": {
    "humid(ity)?|rain(y|ing)?|chill(y)?|wind(y)?|hot|cold|snow(y)?|": "Weather"
  },
  "responses": {
    "Navigation": {
      "today|tonight|tomorrow": "https://mysite.com/weather",
      "weekend": "https://mysite.com/weather/weekend",
      "interactive|radar|motion": "https://mysite.com/weather/radar",
      "readme|instruction": "https://mysite.com/readme"
    },
    "Weather": {
      "weather|temperature|cold|host": "you want to know about the temperature",
      "rain(y|ing)|wet": "you want to know if it will rain"
    }
  }
};

nlp.plugin(plugin);
self.addEventListener('message', function(e) {
  var r = self.nlp(e.data.payload);
  var s;
  console.log(e.data.type, r);
  switch(e.data.type) {
    case 'topics':
      // var s = r.topics();
      // self.postMessage(s.out('html'));
      self.postMessage(r.debug());
      break;
    case 'places':
      // console.log(r.list[0].terms[5].tags)
      s = r.list;
      let nav, cond;
      s.forEach((sentence, i) => {
        console.log('test', r.sentences(i).places().data());
        nav = sentence.world.responses.find('Navigation', s);
        cond = sentence.world.responses.find('Weather', s);
        console.log('test2', nav, cond);
      });
      self.postMessage(`${nav} ${cond}`);
      break;
    default:
      s = r.sentences(1).toUpperCase();
      console.log('sentences', r.sentences().data());
      self.postMessage(s.out('html'));
  }
}, false);
