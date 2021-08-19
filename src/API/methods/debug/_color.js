// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const reset = '\x1b[0m'

//cheaper than requiring chalk
const cli = {
  green: function (str) {
    return '\x1b[32m' + str + reset
  },
  red: function (str) {
    return '\x1b[31m' + str + reset
  },
  blue: function (str) {
    return '\x1b[34m' + str + reset
  },
  magenta: function (str) {
    return '\x1b[35m' + str + reset
  },
  cyan: function (str) {
    return '\x1b[36m' + str + reset
  },
  yellow: function (str) {
    return '\x1b[33m' + str + reset
  },
  black: function (str) {
    return '\x1b[30m' + str + reset
  },
}
export default cli
