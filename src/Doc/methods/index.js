module.exports = Object.assign(
  {},
  require('./01-utils'),
  require('./02-accessors'),
  require('./03-match'),
  require('./04-case'),
  require('./05-whitespace'),
  require('./06-tag'),
  require('./07-loops'),

  require('./insert/01-replace'),
  require('./insert/02-insert'),

  require('./output/01-text'),
  require('./output/02-json'),
  require('./output/03-out'),
  require('./output/04-export'),

  require('./transform/01-sort'),
  require('./transform/02-normalize'),
  require('./transform/03-split'),
  require('./transform/04-join')
)
