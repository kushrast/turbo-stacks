import Header from './Header.jsx';
import InstaList from './InstaList.jsx';

import React from 'react';
import Typed from "typed.js";

import 'bulma/css/bulma.min.css';
import './App.css';
import logo from './logo.svg';


function App() {
  return (
    <div className="App">
      <section class="section">
        <div class="container">
          <Header type="insta-list"/>
          <InstaList/>
        </div>
      </section>
    </div>
  );
}

export default App;
