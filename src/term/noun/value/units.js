'use strict';
const money = require('../../../data/currencies').reduce((h, s) => {
  h[s] = 'currency';
  return h;
}, {});

const units = {
  'Temperature': {
    '°c': 'Celsius',
    '°f': 'Fahrenheit',
    'k': 'Kelvin',
    '°re': 'Reaumur',
    '°n': 'Newton',
    '°ra': 'Rankine',
  },
  'Volume': {
    'm³': 'cubic meter',
    'm3': 'cubic meter',
    'dm³': 'cubic decimeter',
    'dm3': 'cubic decimeter',
    'cm³': 'cubic centimeter',
    'cm3': 'cubic centimeter',
    'l': 'liter',
    'dl': 'deciliter',
    'cl': 'centiliter',
    'ml': 'milliliter',
    'in³': 'cubic inch',
    'in3': 'cubic inch',
    'ft³': 'cubic foot',
    'ft3': 'cubic foot',
    'yd³': 'cubic yard',
    'yd3': 'cubic yard',
    'gal': 'gallon',
    'bbl': 'petroleum barrel',
    'pt': 'pint',
    'qt': 'quart',
    'tbl': 'tablespoon',
    'tsp': 'teaspoon',
    'tbsp': 'tablespoon',
    'cp': 'cup',
    'fl oz': 'fluid ounce',
  },
  'Distance': {
    'km': 'kilometer',
    'm': 'meter',
    'dm': 'decimeter',
    'cm': 'centimeter',
    'mm': 'millimeter',
    'mi': 'mile',
    'in': 'inch',
    'ft': 'foot',
    'feet': 'foot',
    'yd': 'yard',
  },
  'Weight': {
    't': 'tonne',
    'kg': 'kilogram',
    'hg': 'hectogram',
    'g': 'gram',
    'dg': 'decigram',
    'cg': 'centigram',
    'mg': 'milligram',
    'µg': 'microgram',
    'carat': 'carat',
    'grain': 'grain',
    'oz': 'ounce',
    'lb': 'pound',
    'ton': 'tonne',
    'st': 'stone',
  },
  'Area': {
    'km²': 'square kilometer',
    'km2': 'square kilometer',
    'm²': 'square meter',
    'm2': 'square meter',
    'dm²': 'square decimeter',
    'dm2': 'square decimeter',
    'cm²': 'square centimeter',
    'cm2': 'square centimeter',
    'mm²': 'square millimeter',
    'mm2': 'square millimeter',
    'ha': 'hectare',
    'ca': 'centiare',
    'mile²': 'square mile',
    'mile2': 'square mile',
    'in²': 'square inch',
    'in2': 'square inch',
    'yd²': 'square yard',
    'yd2': 'square yard',
    'ft²': 'square foot',
    'ft2': 'square foot',
    'acre': 'acre',
  },
  'Frequency': {
    'hz': 'hertz'
  },
  'Speed': {
    'km/h': 'kilometer per hour',
    'kmph': 'kilometer per hour',
    'mps': 'meter per second',
    'm/s': 'meter per second',
    'mph': 'mile per hour',
    'mi/h': 'mile per hour',
    'knot': 'knot',
  },
  'Data': {
    'b': 'byte',
    'kb': 'kilobyte',
    'mb': 'megabyte',
    'gb': 'gigabyte',
    'tb': 'terabyte',
    'pt': 'petabyte',
    'eb': 'exabyte',
    'zb': 'zettabyte',
    'yb': 'yottabyte',
  },
  'Energy': {
    'j': 'joule',
    'pa': 'pascal',
    'bar': 'bar',
    'w': 'watt',
    'n': 'newton',
    'wb': 'weber',
    't': 'tesla',
    'h': 'henry',
    'c': 'coulomb',
    'v': 'volt',
    'f': 'farad',
    's': 'siemens',
    'o': 'ohm',
    'lx': 'lux',
    'lm': 'lumen'
  },
  'Time': {
    'year': 'year',
    'week': 'week',
    'day': 'day',
    'h': 'hour',
    'min': 'minute',
    's': 'second',
    'ms': 'millisecond',
    'µs': 'microsecond',
    'nanosecond': 'nanosecond',
    'picosecond': 'picosecond',
    'femtosecond': 'femtosecond',
    'attosecond': 'attosecond'
  },
  'Money': money
};

module.exports = Object.keys(units).reduce(function(h, k) {
  Object.keys(units[k]).forEach(function(u) {
    h[u] = {
      name: units[k][u],
      category: k
    };
    h[units[k][u]] = {
      name: units[k][u],
      category: k
    };
  });
  return h;
}, {});
