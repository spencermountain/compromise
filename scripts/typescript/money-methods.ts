import nlp from 'compromise/three'
import type { Money, Numbers } from 'compromise/view/three'

const money: Money = nlp('i paid $5').money()
const parsed: { currency: string, num: number }[] = money.parse()
const values: number[] = money.get()
const currencies: string[] = money.currency()
const json: { money: { currency: string, num: number } }[] = money.json()
money.parse(0)
money.get(0)
money.currency(0)
money.json(0)
money.set(2).add(1).plus(1).subtract(1).minus(1).increment().decrement().currency()
money.set('five').add('two').currency()
money.isEqual(5).equals(5).greaterThan(1).lessThan(9).between(1, 9).isBetween(1, 9).currency()
money.isOrdinal().isCardinal().isUnit('dollars').currency()
money.toNumber().toText().toLocaleString().toNice().currency()
money.first().last().eq(0).slice(0, 1).clone().currency()
money.filter(m => m.found).currency()
money.units().text()
const numbers: Numbers = money.numbers()
const aliases: Numbers = money.values()
// @ts-expect-error Money excludes ordinal conversion.
money.toOrdinal()
// @ts-expect-error Money excludes cardinal conversion.
money.toCardinal()
// @ts-expect-error Money excludes fraction conversion.
money.toFraction()
void [parsed, values, currencies, json, numbers, aliases]
