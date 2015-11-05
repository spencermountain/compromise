let {Tab, Tabs, Grid, Row, Col, Input} = ReactBootstrap;


let Home = React.createClass({

  getInitialState: function () {
    return {
      text: this.props.text || '',
      result: {}
    };
  },
  componentDidMount: function () {},

  fetch: function (file) {
    let cmp = this;
    $.get('./texts/' + file + '.txt', function (txt) {
      cmp.state.text = txt;
      cmp.setState(cmp.state)
    });
  },


  pickTexts: function () {
    let cmp = this;
    let texts = [
      'Clinton_1998','Clinton_1999', 'Clinton_2000',
      'Bush_2001', 'Bush_2002','Bush_2003','Bush_2004', 'Bush_2005',  'Bush_2006', 'Bush_2007','Bush_2008',
      'Obama_2009','Obama_2010','Obama_2011','Obama_2012','Obama_2013','Obama_2014','Obama_2015',
    ];
    let tabs = texts.map(function(s, i) {
      return <Tab key={i} eventKey={s} title={s}>{s}</Tab>;
    });
    return (
      <Tabs activeKey={texts[0]} onSelect={this.fetch} position="left" tabWidth={12} animation={false}>
        {tabs}
      </Tabs>
      );
  },

  result: function() {
    let actions=[
      'nouns',
      'people',
      'places',
      'adjectives',
      'verbs',
    ]
    let tabs = actions.map(function(s, i) {
      return <Tab key={i} eventKey={s} title={s}></Tab>;
    });
    return (
      <div>
        <Tabs tabWidth={12} bsStyle="pills" animation={false}>
          {tabs}
        </Tabs>
        <div>
          {this.state.text}
        </div>
      </div>
      );
  },

  render: function () {
    let cmp = this;
    let state = this.state;

    let css = {
      grid: {
        width: '100%',
        height: '100%',
      },
    };

    return (
      <Grid flex={true} style={css.grid}>
        <Row>
          <Col md={12} >
            {' nlp_compromise '}
            {'v2'}
          </Col>
        </Row>

        <Row>
          <Col md={3} >
              {this.pickTexts()}
          </Col>
          <Col md={9}>
            {this.result()}
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
