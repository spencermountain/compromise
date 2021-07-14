/* eslint-disable no-console */
// getThis: returns the value of this
// getTypeName: returns the type of this as a string. This is the name of the function stored in the constructor field of this, if available, otherwise the object’s [[Class]] internal property.
// getFunction: returns the current function
// getFunctionName: returns the name of the current function, typically its name property. If a name property is not available an attempt is made to infer a name from the function’s context.
// getMethodName: returns the name of the property of this or one of its prototypes that holds the current function
// getFileName: if this function was defined in a script returns the name of the script
// getLineNumber: if this function was defined in a script returns the current line number
import path from 'path'
let here = process.cwd()
const reset = '\x1b[0m'

import { exec } from 'child_process'

const red = function (str) {
  return '\x1b[31m' + str + reset
}
const dim = str => '\x1b[2m' + str + '\x1b[0m'

Error.prepareStackTrace = function (error, stacks) {
  console.log('\n=-=-=-=')
  let last = {
    file: here,
  }

  let file = stacks[0].getFileName()
  if (file) {
    file = file.replace(/file:\/\//, 'vscode://file')
    exec(`open ${file}`)
  }
  stacks.forEach((stack, i) => {
    let abs = stack.getFileName() || ''
    if (abs) {
      abs = new URL(abs).pathname
      let place = {
        file: path.relative(here, abs),
        line: stack.getLineNumber(),
        fn: stack.getFunctionName(),
      }
      if (place.file !== last.file) {
        let rel = path.relative(last.file || '', place.file) + ':' + place.line
        let pad = '  '
        if (i > 0) {
          pad = pad.padEnd(15)
          rel = dim('→ ' + rel)
        } else {
          rel = red(rel)
        }
        console.log(pad + rel)
      }
      last = place
    }
  })
}
