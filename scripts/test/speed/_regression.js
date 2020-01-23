function calculateRegression(x, y) {
  const sumX = x.reduce((acc, v) => acc + v, 0)
  const sumY = y.reduce((acc, v) => acc + v, 0)

  const avgX = sumX / x.length
  const avgY = sumY / y.length

  let sumSqX = 0
  for (let i = 0; i < x.length; i++) {
    sumSqX += Math.pow(x[i] - avgX, 2) // this will never change unless we add more tests...
  }

  let sumP = 0
  for (let i = 0; i < y.length; i++) {
    sumP += (x[i] - avgX) * (y[i] - avgY)
  }

  const b = sumP / sumSqX
  const a = avgY - b * avgX
  const result = `${b.toFixed(5)}X ${a > 0 ? '+' : '-'} ${a.toFixed(5)}`

  return { regression: result, average: avgY.toFixed(5) }
}
module.exports = calculateRegression
