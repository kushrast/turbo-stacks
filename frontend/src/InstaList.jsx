import FadeIn from 'react-fade-in';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';

import {createNewList} from './api/Storage.js';

import React from 'react';

class ListTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div class="list-header columns is-centered">
          <div class="column is-7 field is-grouped">
            <input class="input list-title-input underline" ref="input" defaultValue="New List" onChange={this.props.updateTitle}/>
            <p class="buttons">
            {
              this.props.numItems > 0 ?
              <button class="button is-success is-medium is-light"  onClick={this.props.saveList}>
                <span class="icon">
                  <FontAwesomeIcon icon={faCheck} size="xs"/>
                </span>
              </button>
              :
              <button class="button is-medium is-light" disabled>
                <span class="icon">
                  <FontAwesomeIcon icon={faCheck} size="xs"/>
                </span>
              </button>
            }
            </p>
          </div>
        </div>
      );
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    }
  }

  getPlaceholder = () => {
    if (this.props.newListItem) {
      return "Add new item";
    } 
    return "Enter a value";
  }

  getDefaultValue = () => {
    if (this.props.newListItem) {
      return "";
    } 
    return this.state.value;
  }

  getDefaultValue = () => {
    if (this.props.newListItem) {
      return "";
    } 
    return this.state.value;
  }

  updateInputValue = (inputElem) => {
    this.setState({value: inputElem.target.value});
  }

  onSubmit = () => {
    this.refs.input.blur();
    this.props.onEnter(this.state.value);
    if (this.props.newListItem) {
      this.setState({value: ""});
    }
  }

  onKeyDown = (event) => {
    if (event.key==="Enter") {
      this.onSubmit();
    }
  }

  render() {
    return (
        <div class="columns is-centered">
          <div class="column is-6">
            <div class="card">
              <div class="card-content list-card">
                <div class="content">
                  <div class="field is-grouped list-item-number">
                    <p class="control list-item is-expanded">
                      <input class="input list-item-input underline" ref="input" placeholder={this.getPlaceholder()} type="text" value={this.state.value} onChange={this.updateInputValue} onKeyDown={this.onKeyDown}/>
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

const SortableListItem = sortableElement(({value, onEnter}) => (
  <li class="list-item-container">
    <ListItem value={value} onEnter={onEnter}/>
  </li>
));

const SortableListContainer = sortableContainer(({children}) => {
  return <ul>{children}</ul>;
});

class InstaList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      title: "New Title"
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  };

  addNewItem = (newValue) => {
    this.setState({items: [...this.state.items, newValue]});
  }

  updateTitle = (titleUpdateEvent) => {
    this.setState({title: titleUpdateEvent.target.value});
  }

  saveList = () => {
    createNewList(this.state.title, this.state.items);
  }

  render() {
    return (
      <div>
          <ListTitle numItems={this.state.items.length} saveList={this.saveList} updateTitle={this.updateTitle} />
          <SortableListContainer onSortEnd={this.onSortEnd}>
          {this.state.items.map((item, i) => (
              <SortableListItem
                key={item}
                value={item}
                index={i}
                onEnter={(a)=>{console.log(a)}}/>))}
          </SortableListContainer>
          <ListItem newListItem={true} onEnter={this.addNewItem}/>
      </div>
      );
  }
}

export default InstaList;