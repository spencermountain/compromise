const sh = require('shelljs')

// if given, run just one test:
let arg = process.argv[2]
if (arg) {
  let code = 0
  console.log(arg + ':')
  if (arg === 'main') {
    code = sh.exec('tape "./tests/**/*.test.js" | tap-dancer --color always').code
  } else {
    code = sh.exec(`tape "./plugins/${arg}/tests/**/*.test.js" | tap-dancer --color always`).code
  }
  sh.exit(code)
}

// run the main tests:
let fail = false
let code = sh.exec('tape "./tests/**/*.test.js" | tap-dancer --color always').code
if (code !== 0) {
  fail = true
}

// run each plugin's tests:
sh.ls('./plugins').forEach(function (dir) {
  code = sh.exec(`tape "./plugins/${dir}/tests/**/*.test.js" | tap-dancer --color always`).code
  if (code !== 0) {
    console.log(dir)
    fail = true
  }
})

// return proper exit-code:
if (fail) {
  sh.exit(1)
} else {
  sh.exit(0)
}
