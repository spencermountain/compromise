/** deep-copy the document, so that no references remain */
exports.clone = function() {
  let list = this.list.map(ts => ts.clone())
  let tmp = this.buildFrom(list)
  return tmp
}
