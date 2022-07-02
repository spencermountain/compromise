import streamFile from './stream/streamFile.js'
import keyPress from './keypress/index.js'
import workerPool from './workerPool/plugin.js'
import lazyParse from './lazyParse/plugin.js'
import version from './_version.js'

// combine all the plugins
const plugin = {
  lib: Object.assign({}, streamFile.lib, keyPress.lib, workerPool.lib, lazyParse.lib),
  version: version
}

export { streamFile, keyPress, workerPool, lazyParse }
export default plugin

