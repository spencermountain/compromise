import expand from './expand/index.js'
import api from './api/index.js'
import contractions from './model/contractions.js'

const plugin = {
  model: { contractions },
  methods: { contractions: { expand: expand } },
  api: api,
}
export default plugin
