import streamFile from './stream/streamFile.js'
import keyPress from './keypress/index.js'
import workerPool from './workerPool/plugin.js'
import lazyParse from './lazyParse/plugin.js'

// combine all the plugins
const plugin = {
  api: function (view) {
    lazyParse.api(view)
  },
  lib: Object.assign({}, streamFile.lib, keyPress.lib, workerPool.lib, lazyParse.lib),
}

export { streamFile, keyPress, workerPool, lazyParse }
export default plugin

