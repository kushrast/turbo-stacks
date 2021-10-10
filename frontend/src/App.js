import Header from './Header.jsx';
import MainPageNavigation from './MainPageNavigation.jsx';
import InstaList, {InstaListForm} from './InstaList.jsx';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import React from 'react';
import Typed from "typed.js";

import 'bulma/css/bulma.min.css';
import './App.css';
import logo from './logo.svg';

export default function App() {
  return (
  <Router>
    <div className="App">
      <section class="section">
        <div class="container">
          <Header type="insta-list"/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/instalist">
              <InstaListRouter/>
            </Route>
            <Route exact path="/">
              <MainPageNavigation/>
            </Route>
          </Switch>
        </div>
      </section>
    </div>
  </Router>);
}

function InstaListRouter() {
  let { url } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${url}/new_list`}>
        <InstaListForm/>
      </Route>
      <Route path={`${url}/:id`}>
        <InstaList/>
      </Route>
    </Switch>
    );
}