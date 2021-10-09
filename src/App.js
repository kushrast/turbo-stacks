import FadeIn from 'react-fade-in';
import { useState, useEffect} from 'react';

import {Heading, Icon} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';

import Header from './Header.jsx';

import React from 'react';
import Typed from "typed.js";

import 'bulma/css/bulma.min.css';
import './App.css';
import logo from './logo.svg';

class ListTitle extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div class="list-header columns is-centered">
          <div class="column is-7">
            <input class="input list-title-input underline" type="text" defaultValue="New List"/>
          </div>
        </div>
      );
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  getPlaceholder = () => {
    if (this.props.newListItem) {
      return "Add new item";
    } 
    return "Enter a value";
  }

  getValue = () => {
    if (this.props.newListItem) {
      return "";
    } 
    return this.props.value;
  }

  render() {
    return (
        <div class="columns is-centered">
          <div class="column is-7">
            <div class="card">
              <div class="card-content list-card">
                <div class="content">
                  <div class="field is-grouped list-item-number">
                    <p class="control list-item is-expanded">
                      <input class="input list-item-input underline" placeholder={this.getPlaceholder()} type="text" defaultValue={this.getValue()} />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

const SortableListItem = sortableElement(({value}) => (
  <li class="list-item-container">
    <ListItem value={value}/>
  </li>
));

const SortableListContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class InstaList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: ["yeppers", "yeppersChode"]
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  };

  render() {
    return (
      <div>
          <ListTitle/>
          <SortableListContainer onSortEnd={this.onSortEnd}>
          {this.state.items.map((item, i) => (
              <SortableListItem
                key={item}
                value={item}
                index={i}/>))}
          </SortableListContainer>
      </div>
      );
  }
}


function App() {
  return (
    <div className="App">
      <section class="section">
        <div class="container">
          <Header/>
          <InstaList/>
        </div>
      </section>
    </div>
  );
}

export default App;
