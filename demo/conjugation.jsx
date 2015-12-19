let {Row, Col, Input, Grid} = ReactBootstrap;

let Conjugation = React.createClass({

  getInitialState: function () {
    return {
      words: {},
      word: 'walk',
    };
  },
  componentDidMount: function () {
    this.update();
  },

  update: function (el) {
    let word = this.state.word || '';
    if (el) {
      word = el.target.value || '';
    }
    let v = nlp.Verb(word);
    this.state.words = v.conjugate();
    this.state.word = word;
    this.setState(this.state);
  },

  result: function() {
    let cmp = this;
    return Object.keys(this.state.words).map(function(k, i) {
      let negated = nlp.Verb(cmp.state.words[k]).negate();
      return (
        <Row key={i}>
          <Col md={4} xs={4}>
            {k + ':'}
          </Col>
          <Col md={4} xs={4}>
            <b>{cmp.state.words[k]}</b>
          </Col>
          <Col md={4} xs={4}>
            {negated}
          </Col>
        </Row>
        );
    });
  },
  newWord: function() {
    let keys = Object.keys(window.nlp.Lexicon);
    keys = keys.filter(function(k) {
      if (!window.nlp.Lexicon[k]) {
        console.log(k);
      }
      return window.nlp.Lexicon[k] === 'Infinitive';
    });
    let l = keys.length;
    let r = parseInt(Math.random() * l, 10);
    this.state.word = keys[r];
    this.setState(this.state);
    this.update();
  },
  render: function () {
    let css = {
      grid: {},
      top: {
        height: 200,
        display: 'block'
      },
      img: {
        width: 40,
        cursor: 'pointer',
        textAlign: 'left'
      }
    };
    return (
      <Grid flex={true} style={css.grid}>
        <Row>
          <Col md={12} style={css.top}>
            {'Verb conjugation - nlp_compromise '}
            {'v2'}
          </Col>
        </Row>

        <Row>
          <Col md={4} xs={0}/>
          <Col md={4} xs={10}>
            <Input type="text" value={this.state.word} onChange={this.update}/>
          </Col>
          <Col md={4} xs={2}>
            <img style={css.img} src="./refresh.ico" onClick={this.newWord}/>
          </Col>
        </Row>

        <Row>
          <Col md={3} xs={0}/>
          <Col md={6} xs={12}>
            {this.result()}
          </Col>
        </Row>

        <Row>
          <Col md={3} />
        </Row>
      </Grid>
      );
  }

});

window.Conjugation = Conjugation;
