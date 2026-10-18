import nlp from 'compromise/three'

const rates: Record<string, number> = nlp.world().model.three.decimalCurrencies
rates.cent = 0.01
rates.token = 0.001
// @ts-expect-error Decimal currency multipliers must be numbers.
rates.cent = 'one hundredth'
