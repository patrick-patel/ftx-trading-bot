import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      matic: 0,
      link: 0,
      btc: 0
    }
  }

  render () {
    return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact={true} component={Dashboard}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
        </Switch>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));