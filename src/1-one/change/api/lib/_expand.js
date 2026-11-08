// are we changing part of a contraction? expand it first
const expandContraction = function (m) {
  if (m.has('@hasContraction') && m.contractions) {
    m.grow('@hasContraction').contractions().expand()
  }
}
export default expandContraction
