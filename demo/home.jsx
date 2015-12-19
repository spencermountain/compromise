let {Syllables, Pos, Sentences, Conjugation} = window;
let {Grid, Row, Col} = ReactBootstrap;

let css = {
  row: {
    paddingTop: 80
  }
};

let Home = React.createClass({
  getInitialState: function () {
    return {
      word: ''
    };
  },
  componentWillUpdate: function () {},
  update: function () {},
  render: function () {
    let demos = [
      // <Conjugation/>,
      <Syllables/>,
      <Pos/>,
      <Sentences/>,
    ];
    demos = demos.map(function(d) {
      return (
        <Row style={css.row}>
          <Col md={12} xs={12}>
            {d}
            <hr/>
          </Col>
        </Row>
        );
    });
    return (
      <Grid>
        {demos}
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
