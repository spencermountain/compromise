'use strict';
const request = require('request');
const fs = require('fs');
const path = require('path');
const fileSize = require('../lib/filesize');
const chalk = require('chalk');

const compress = function(src, out, cb) {
  src = path.join(__dirname, src);
  out = path.join(__dirname, out);
  let code = fs.readFileSync(src).toString();
  request.post({
    url: 'http://closure-compiler.appspot.com/compile',
    form: {
      js_code: code,
      language_out: 'es5',
      compilation_level: 'ADVANCED_OPTIMIZATIONS',
      output_format: 'text',
      // output_info: 'warnings', //'statistics'
      output_info: 'compiled_code', //'statistics'
    }
  }, function(err, httpResponse, body) {
    if (err) {
      console.log(err);
    }
    fs.writeFileSync(out, body);
    // console.log(body);
    console.log(chalk.green(' done!    ' + fileSize(out) + 'k\n'));
    cb(body);
  });
};

compress('../../builds/compromise.js', '../../builds/compromise.min.js', function(code) {
  // console.log(code);
});
