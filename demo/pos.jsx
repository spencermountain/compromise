let {Tab, Tabs, Grid, Row, Col, Input} = ReactBootstrap;

let colours = {
  Noun: 'steelblue',
  Adjective: '#e5762b',
  Verb: 'darkseagreen',
  Adverb: 'mediumturquoise',
  Person: 'cornflowerblue',
  Place: 'cornflowerblue',
  Value: 'lightsalmon',
  Date: 'lightcoral',
};

let css = {
  result: {
    height: 400,
    maxHeight: 400,
    overflowY: 'auto',
    overflowX: 'hidden',
    borderRadius: 5,
    border: '1px solid grey',
    margin: 20,
    marginTop: 0
  },
  grid: {
    width: '100%',
    height: '100%',
  },
  sentence: {
    padding: 10,
  }
};

let Pos = React.createClass({

  getInitialState: function () {
    return {
      text: this.props.text || '',
      result: {},
      show: this.props.show || 'Noun'
    };
  },
  componentDidMount: function () {
    this.fetch();
  },

  fetch: function (el) {
    let cmp = this;
    let file = 'Clinton_1998';
    if (el && el.target && el.target.value) {
      file = el.target.value;
    }
    $.get('./texts/' + file + '.txt', function (txt) {
      cmp.state.text = txt;
      cmp.state.result = nlp.Text(txt);
      console.log(cmp.state.result);
      cmp.setState(cmp.state);
    });
  },

  underline: function (pos) {
    this.state.show = pos;
    this.setState(this.state);
  },

  pickTexts: function () {
    let texts = [
      'Clinton_1998', 'Clinton_1999', 'Clinton_2000',
      'Bush_2001', 'Bush_2002', 'Bush_2003', 'Bush_2004', 'Bush_2005', 'Bush_2006', 'Bush_2007', 'Bush_2008',
      'Obama_2009', 'Obama_2010', 'Obama_2011', 'Obama_2012', 'Obama_2013', 'Obama_2014', 'Obama_2015',
    ];
    let options = texts.map(function(s, i) {
      return <option key={i} eventKey={s} value={s} title={s}>{s}</option>;
    });
    return (
      <Input type="select" addonBefore={'Text:'} bsStyle={'success'} onChange={this.fetch}>
        {options}
      </Input>
      );
  },

  isHighlighted: function(t, str) {
    if (t.pos[str]) {
      return true;
    }
    return false;
  },

  result: function() {
    let cmp = this;
    let sentences = (this.state.result.sentences || []).map(function(s, key) {
      let terms = s.terms.map(function(t, i) {
        let css_word = {
          borderBottom: '2px solid white'
        };
        if (cmp.isHighlighted(t, cmp.state.show)) {
          css_word.borderBottom = '2px solid ' + colours[cmp.state.show];
        }
        return <span style={css_word} key={i} title={t.tag + '  ' + t.reason}>{' ' + t.text}</span>;
      });
      return (
        <div style={css.sentence} key={key}>
          {terms}
        </div>
        );
    });
    return (
      <div style={css.result}>
          {sentences}
        </div>
      );
  },

  render: function () {

    let actions = [
      'Noun',
      'Adjective',
      'Verb',
      'Person',
      'Place',
      'Date',
      'Value',
    ];
    let tabs = actions.map(function(s, i) {
      return <Tab key={i} eventKey={s} title={s}/>;
    });
    return (
      <Grid flex={true} style={css.grid}>
        <Row>
          <Col md={12} >
            {'Part-of-Speech tagging'}
          </Col>
        </Row>

        <Row>
          <Col md={4} xs={4} >
            {this.pickTexts()}
          </Col>
          <Col md={8} xs={8} >
            <Tabs defaultActiveKey={'Noun'} activeKey={this.state.show} bsStyle="pills" animation={false} onSelect={this.underline}>
              {tabs}
            </Tabs>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            {this.result()}
          </Col>
        </Row>

      </Grid>
      );
  }

});


window.Pos = Pos;
