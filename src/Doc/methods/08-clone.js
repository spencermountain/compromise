exports.clone = function() {
  let list = this.list.map(ts => ts.clone())
  let tmp = this.buildFrom(list)
  return tmp
}
