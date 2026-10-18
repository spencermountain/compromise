import keyPress from './keypress/index.js'
import lazyParse from './lazyParse/plugin.js'
import version from './_version.js'

const plugin = {
  lib: { ...keyPress.lib, ...lazyParse.lib },
  version,
}

export { keyPress, lazyParse }
export default plugin
