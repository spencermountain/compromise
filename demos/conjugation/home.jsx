let {Tab, Tabs, Grid, Row, Col, Input} = ReactBootstrap;

let Home = React.createClass({

  getInitialState: function () {
    return {
      words: {},
      word: '',
    };
  },
  componentDidMount: function () {
    this.update();
  },

  update: function (el) {
    let word = this.state.word || 'walk';
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
          <Col md={4}>
            {k + ':'}
          </Col>
          <Col md={4}>
            <b>{cmp.state.words[k]}</b>
          </Col>
          <Col md={4}>
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
    let cmp = this;
    let state = this.state;
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
          <Col md={4} ></Col>
          <Col md={4} >
            <Input type="text" value={this.state.word} onChange={this.update}/>
          </Col>
          <Col md={4} >
            <img style={css.img} src="./refresh.ico" onClick={this.newWord}/>
          </Col>
        </Row>

        <Row>
          <Col md={3} ></Col>
          <Col md={6} >
            {this.result()}
          </Col>
        </Row>

        <Row>
          <Col md={3} >
          </Col>
        </Row>
      </Grid>
      );
  }

});


window.setTimeout(function () {
  ReactDOM.render(
    <Home/>,
    document.getElementById('main')
  );
}, 500);
