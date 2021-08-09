import expand from './expand/index.js'
import api from './api/index.js'
import contractions from './model/contractions.js'

const plugin = {
  model: { contractions },
  compute: { contractions: expand },
  api: api,
}
export default plugin
