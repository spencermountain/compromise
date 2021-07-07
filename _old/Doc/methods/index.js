module.exports = Object.assign(
  {},
  require('./01-utils'),
  require('./02-accessors'),
  require('./03-match'),
  require('./04-tag'),
  require('./05-loops'),
  require('./06-lookup'),
  require('./07-cache'),

  require('./insert/01-replace'),
  require('./insert/02-insert'),

  require('./output/01-text'),
  require('./output/02-json'),
  require('./output/03-out'),

  require('./transform/01-sort'),
  require('./transform/02-normalize'),
  require('./transform/03-split'),
  require('./transform/04-case'),
  require('./transform/05-whitespace'),
  require('./transform/06-join'),
  require('./transform/07-contract')
)
