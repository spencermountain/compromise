require('shelljs/global');
var nyc = './node_modules/nyc/bin/nyc.js';

//run tests server-side
exec(nyc + ' --reporter=text-summary npm test');
