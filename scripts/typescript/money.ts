import nlp from 'compromise/three'

const money = nlp('i paid $5.32').money().add(1).subtract(1).first()
const currencies: string[] = money.currency()
money.toText().toNumber().increment().decrement().set(5).plus(1).minus(1)
money.greaterThan(1).lessThan(10).between(1, 10).isEqual(5).currency()
// @ts-expect-error Money does not expose ordinal conversion.
money.toOrdinal()
// @ts-expect-error Money does not expose cardinal conversion.
money.toCardinal()
// @ts-expect-error Money does not expose fraction conversion.
money.toFraction()
money.numbers().toOrdinal()
void currencies
