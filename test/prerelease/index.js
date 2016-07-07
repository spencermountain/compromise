var checklist = require('./checklist');

var src = require('../../src/index');
var build = require('../../builds/nlp_compromise.js');
var min = require('../../builds/nlp_compromise.min.js');

checklist(src, 'src');
checklist(build, 'build');
checklist(min, 'minify');
