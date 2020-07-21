import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import Header from './Components/Header';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Student from './pages/Student';
import Educator from './pages/Educator';
import './App.css'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/student" component={Student} />
        <Route path="/educator" component={Educator} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
