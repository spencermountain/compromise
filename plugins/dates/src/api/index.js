import dates from './dates.js'
import times from './times.js'
import durations from './durations/index.js'

const api = function (View) {
  dates(View)
  times(View)
  durations(View)
}
export default api