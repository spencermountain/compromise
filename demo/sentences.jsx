let {Row, Col, Input} = ReactBootstrap;
let {nlp_compromise} = window;

let Sentences = React.createClass({
  getInitialState: function () {
    return {
      word: 'hi Dr. John',
      result: []
    };
  },
  componentDidMount: function () {
    this.update();
  },
  update: function (el) {
    let word = 'hi Dr. John';
    if (el && el.target) {
      word = el.target.value || '';
    }
    this.state.word = word;
    let t = nlp_compromise.text(word);
    this.state.result = t.sentences.map(function(s) {
      return s.text();
    });
    this.setState(this.state);
  },
  render: function () {
    let state = this.state;
    let css = {
      part: {
        padding: 15,
        fontSize: 30
      },
      title: {
        fontSize: 20
      },
      code: {
        color: 'grey'
      }
    };
    let code = 'nlp.Text(\'\').sentences';
    let result = state.result.map(function(a, i) {
      return <li key={i} style={css.part}>{a}</li>;
    });
    return (
      <Row>
        <Row>
          <Col md={2} xs={2} style={css.title}>
            {'Sentences'}
          </Col>
          <Col md={10} xs={10} style={css.code}>
            {code}
          </Col>
        </Row>
        <Row>
          <Col md={1} xs={1}/>
          <Col md={10} xs={10}>
            <Input type="text" value={this.state.word} bsSize="large" placeholder="Sentences" addonAfter={'Sentences'} onChange={this.update} />
          </Col>
        </Row>
        <Row>
          <Col md={10} xs={10}>
            {result}
          </Col>
        </Row>
      </Row>
      );
  }
});

window.Sentences = Sentences;
