let {Tab, Tabs, Grid, Row, Col, Input} = ReactBootstrap;

let Home = React.createClass({
  getInitialState: function () {
    return {
      word: ''
    };
  },
  componentWillUpdate: function () {},
  update: function () {},
  render: function () {
    let cmp = this;
    let state = this.state;
    let css = {    };
    return (
      <Row>
        <Row>
          <Col md={1} xs={1}></Col>
          <Col md={10} xs={10}>
            <Syllables/>
            <hr/>
          </Col>
        </Row>
        <Row>
          <Col md={1} xs={1}></Col>
          <Col md={10} xs={10}>
            <Sentences/>
            <hr/>
          </Col>
        </Row>
      </Row>
      );
  }
});


window.setTimeout(function () {
  ReactDOM.render(
    <Home/>,
    document.getElementById('main')
  );
}, 500);
