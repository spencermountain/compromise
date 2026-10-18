import version from './_version.js'
import api from './api.js'
import syllables from './syllables/index.js'
import soundsLike from './sounds-like/index.js'

export default {
  version,
  api,
  compute: {
    syllables,
    soundsLike,
  },
}
