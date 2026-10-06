const shift = (date, amount, unit) => {
  if (Number.isInteger(amount) || (unit !== 'week' && unit !== 'fortnight')) {
    return date.add(amount, unit)
  }
  // Spacetime rounds fractional week dates, losing a day on the return trip.
  const days = amount * (unit === 'fortnight' ? 14 : 7)
  const whole = Math.trunc(days)
  const remainder = Math.round((days - whole) * 86400000)
  // Whole days follow the local calendar; the partial day is elapsed time.
  // Reverse the operation order when subtracting, including across DST.
  if (amount < 0) {
    return date.add(remainder, 'millisecond').add(whole, 'day')
  }
  return date.add(whole, 'day').add(remainder, 'millisecond')
}

export default shift
