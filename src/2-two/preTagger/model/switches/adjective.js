const jj = 'Adjective'

export default {
  before: {
    Determiner: jj, //the detailed
    Copula: jj, //is detailed
    Possessive: jj, //spencer's detailed
  },

  after: {},

  beforeWords: {
    seem: jj, //seem prepared
    seemed: jj,
    seems: jj,
    feel: jj, //feel prepared
    feels: jj,
    felt: jj,
    appear: jj,
    appears: jj,
    appeared: jj,
    really: jj, //really damaged
    quite: jj,
    well: jj,
    very: jj,
    deeply: jj,
    profoundly: jj,
    extremely: jj,
    so: jj,
    badly: jj,
    mostly: jj,
    totally: jj,
    also: jj,
    over: jj, //over cooked
    under: jj,
    too: jj, //too insulting
    it: jj, //find it insulting
    but: jj, //nothing but frustrating
  },
  afterWords: {},
}