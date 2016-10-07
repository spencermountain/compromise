# NLP Compromise
[![CodacyBadge](https://api.codacy.com/project/badge/grade/82cc8ebd98b64ed199d7be6021488062)](https://www.codacy.com/app/spencerkelly86/nlp_compromise)
[![npm version](https://badge.fury.io/js/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)
[![downloads](https://img.shields.io/npm/dm/nlp_compromise.svg)](https://www.npmjs.com/package/nlp_compromise)

 
NLP-Compromise is a Javascript framework that provides a set of natural language analysis 
and manipulation tools. It can give the base forms of words, their parts of speech, whether they are names of companies, 
people, places, etc., normalize dates, times, and numeric quantities, and mark up the structure of sentences 
in terms of phrases and word dependencies.

Unlike most NLP programs that run on the server, NLP-Compromise runs in a typical web-browser.

### Significant Characteristics
* Minimized library size is less than 200KB
* 86% alignment with [Penn Treebank Project](http://www.cis.upenn.edu/~treebank/)

## Documentation
* [Wiki](https://github.com/nlp-compromise/nlp_compromise/wiki)
* [API](https://github.com/nlp-compromise/nlp_compromise/wiki/API)

## Development
We try to make development with NLP Compromise as simple as possible. The information below 
should help to get you started developing with the library and/or contributing to the project.

### Technologies Used

* Javascript
* NodeJS
* Grunt
* Babelify
* Browserify
* Tape
* Tap-Spec

####Installing NodeJS
 
We also use a number of node.js tools to initialize and test NLP-Compromise. 
You must have node.js and its package manager (npm) installed. You can get these tools from 
[nodejs.org](http://nodejs.org/).

####Installing Grunt
To install Grunt, you must first download and install [NodeJS](http://nodejs.org/) (which includes npm). npm stands for node packaged modules and is a way to manage development dependencies through node.js.

Then, from the command line:
Install grunt-cli globally with ```npm install -g grunt-cli```.
Navigate to the root /nlp_compromise/ directory, then run ```npm install```. npm will look at the package.json file and automatically install the necessary local dependencies listed there.
When completed, you'll be able to run the various Grunt commands provided from the command line.

####Building NLP-Compromise
[Once you have set up your environment](https://github.com/nlp-compromise/nlp_compromise/blob/master/CONTRIBUTING.MD), just run:

```
grunt package
```

####Install with npm

```
$ npm install nlp_compromise
```

####Javascript Import

```
let nlp = require('nlp_compromise');
```

####See it in Action
Once you have the project installed and referenced in a Javascript file, you can use the following
code to see the project in action:
```javascript
let nlp = require('nlp_compromise'); // or nlp = window.nlp_compromise

nlp.noun('dinosaur').pluralize();
// 'dinosaurs'

nlp.verb('speak').conjugate();
// { past: 'spoke',
//   infinitive: 'speak',
//   gerund: 'speaking',
//   actor: 'speaker',
//   present: 'speaks',
//   future: 'will speak',
//   perfect: 'have spoken',
//   pluperfect: 'had spoken',
//   future_perfect: 'will have spoken'
// }

nlp.statement('She sells seashells').negate().text()
// 'She doesn't sell seashells'

nlp.sentence('I fed the dog').replace('the [Noun]', 'the cat').text()
// 'I fed the cat'

nlp.text('Tony Hawk did a kickflip').people();
// [ Person { text: 'Tony Hawk' ..} ]

nlp.noun('vacuum').article();
// 'a'

nlp.person('Tony Hawk').pronoun();
// 'he'

nlp.value('five hundred and sixty').number;
// 560

nlp.text(require('nlp-corpus').text.friends()).topics()//11 seasons of friends
// [ { count: 2523, text: 'ross' },
//   { count: 1922, text: 'joey' },
//   { count: 1876, text: 'god' },
//   { count: 1411, text: 'rachel' },
//   ....
```

####Running tests
To execute all unit tests, use:

    grunt test:unit

To execute end-to-end (e2e) tests, use:

    grunt package
    grunt test:e2e

To learn more about the grunt tasks, run `grunt --help`

####Deployment
To deploy NLP-Compromise, simply link to the project's CDN library

```
<script src="https://unpkg.com/nlp_compromise@latest/builds/nlp_compromise.min.js"></script>
```
####Continuous Integration

##### Travis CI

Travis CI is a continuous integration service, which can monitor GitHub for new commits to your repository and execute scripts such as building the app or running tests. The project contains a Travis configuration file, .travis.yml, which will cause Travis to run your tests when you push to GitHub.

You will need to enable the integration between Travis and GitHub. See the Travis website for more instruction on how to do this.

####Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, 
see the [tags on this repository](https://github.com/nlp-compromise/nlp_compromise/tags). 

###Contributing

Please read [CONTRIBUTING.md](https://github.com/nlp-compromise/nlp_compromise/blob/master/CONTRIBUTING.MD) for details on our code of conduct, and the process for submitting pull requests to us.

##Authors

* **Spencer Kelly** - *Initial work* - [SpencerMountain](https://github.com/spencermountain)

See also the list of [contributors](https://github.com/nlp-compromise/nlp_compromise/contributors) who participated in this project.

##How you can help

Filing issues is helpful but **pull requests** that improve the code and the docs are even better!
Not only do we welcome all contributions, but we will gladly work with you to incorporate commits 
and suggestions.

##License

Code licensed under an [MIT License](LICENSE.md).

Documentation licensed under [Creative Commons BY 4.0](http://creativecommons.org/licenses/by/4.0/).


 