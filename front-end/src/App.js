import React, { Component } from 'react';
import Main from './components/Main'
import Question from './components/Question'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Crud from './components/Crud'
import AddQuestion from './components/AddQuestion'
import EditQuestion from './components/EditQuestion'
import { Route, Switch } from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Main />
        <div className="container container-fluid">
          <br />
          <br />
          <Navbar />
          <br />
          <br />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/answer" component={Question} />
            <Route exact path="/crud" component={Crud} />
            <Route exact path="/crudd/add" component={AddQuestion} />
            <Route exact path="/crud/edit/:id" component={EditQuestion} />
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
