// Only precheck required, single-term tokens without special matching steps.
const canCheck = reg => Boolean(reg && !reg.optional && !reg.negative && !reg.greedy &&
  !reg.choices && !reg.anything && !reg.regex && !reg.method)

const getBoundary = (reg, boundary) => {
  if (!canCheck(reg) || !reg[boundary]) {
    return null
  }
  return reg
}

export { canCheck, getBoundary }
