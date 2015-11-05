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
    return Object.keys(this.state.words).map(function(k) {
      return (
        <Row>
          <Col md={6}>
            <b>{k}</b>
          </Col>
          <Col md={6}>
            {cmp.state.words[k]}
          </Col>
        </Row>
        );
    });
  },

  render: function () {
    let cmp = this;
    let state = this.state;
    let css = {
      grid: {},
      top: {
        height: 200,
        display: 'block'
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
        </Row>

        <Row>
          <Col md={4} ></Col>
          <Col md={4} >
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
