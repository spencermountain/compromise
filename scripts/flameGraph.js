require('shelljs/global');
var fileServer = './node_modules/.bin/http-server';
// let interval = setInterval(() => {
//   exec(`node scratch_file.js`);
// }, 1000);
// exec(`build/dtrace -n 'profile-97/pid == 5191/{ @[jstack(80, 8192)] = count(); }' -c "sleep 10" > dtrace.out`);
// exec(`dtrace -n 'profile-97/execname == "node" && arg1/{ @[jstack(150, 8000)] = count(); } tick-60s { exit(0); }' > stacks.out`);
// exec(`node scratch_file.js`);
//
// exec('stackvis < ./performance/dtrace.out > ./performance/flamegraph.htm');
// exec('google-chrome ./performance/flamegraph.htm');


// exec(fileServer + ' test/perf -o -c-1');
exec(fileServer + ' -o');
