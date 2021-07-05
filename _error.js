// getThis: returns the value of this
// getTypeName: returns the type of this as a string. This is the name of the function stored in the constructor field of this, if available, otherwise the object’s [[Class]] internal property.
// getFunction: returns the current function
// getFunctionName: returns the name of the current function, typically its name property. If a name property is not available an attempt is made to infer a name from the function’s context.
// getMethodName: returns the name of the property of this or one of its prototypes that holds the current function
// getFileName: if this function was defined in a script returns the name of the script
// getLineNumber: if this function was defined in a script returns the current line number
import path from 'path'
let here = process.cwd()

Error.prepareStackTrace = function (error, stacks) {
  stacks.forEach((stack, i) => {
    console.log('=-=-=-= \n')
    let abs = stack.getFileName() || ''
    if (abs) {
      abs = new URL(abs).pathname
      let rel = './' + path.relative(here, abs)
      console.log(i, rel + '  : ' + stack.getLineNumber())
      let fn = stack.getFunctionName()
      if (fn) {
        console.log(`        → .${stack.getFunctionName()}()`)
      }
    }
    // return false
  })
  // console.log(stacks)
  console.log(error)

  //  alert("FunctionName: " + stacks[0].getFunctionName())
  //  return "MyStackObject";
}

console.log('-----start--')
