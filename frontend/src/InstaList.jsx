import FadeIn from 'react-fade-in';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrash, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import { withRouter } from "react-router";

import {createNewInstaList, getInstaList} from './api/Storage.js';

import React from 'react';

class ListTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div class="list-header columns is-centered">
          <div class="column is-7 field is-grouped">
            <input class="input list-title-input underline" ref="input" defaultValue={this.props.value} onChange={this.props.updateTitle}/>
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
    <div class="column is-7">
      <div class="card">
        <div class="card-content list-card">
          <div class="content">
            <div class="field is-grouped list-item-number">
              <p class="control list-item is-expanded">
                <input class="input list-item-input underline" ref="input" placeholder={this.getPlaceholder()} type="text" value={this.state.value} onChange={this.updateInputValue} onKeyDown={this.onKeyDown}/>
              </p>
              { this.props.newListItem ?
                <p></p> :
              <p class="buttons">
                <button class="button is-ghost is-medium" onClick={() => {this.props.onDelete(this.props.index)}}>
                  <span class="icon">
                    <FontAwesomeIcon icon={faTimesCircle} size="xs"/>
                  </span>
                </button>
              </p>
            }
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      );
  }
}

const SortableListItem = sortableElement(({value, onEnter, index, onDelete}) => (
  <li class="list-item-container">
    <ListItem value={value} onEnter={onEnter} index={index} onDelete={onDelete}/>
  </li>
));

const SortableListContainer = sortableContainer(({children}) => {
  return (
    <ul>{children}</ul>
  );
});

class ListControls extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="columns is-centered">
        <div class="column is-7">
        { !this.props.isToggled ? 
          <button class="button is-info is-light" onClick={this.props.toggleList}>Toggle</button>
          :
          <button class="button is-info" onClick={this.props.toggleList}>Untoggle</button>
        }
        </div>
      </div>
      );
  }
}

class InstaList extends React.Component {
  constructor(props) {
    super(props);

    var savedListData = getInstaList(props.match.params.id);

    this.state = {
      items: savedListData.items,
      title: savedListData.title
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
    var newListId = createNewInstaList(this.state.title, this.state.items);

    this.props.history.push("/instalist/" + newListId);
  }

  onDelete = (index) => {
    var newItemsList = this.state.items;
    newItemsList.splice(index, 1);
    this.setState({items: newItemsList});
  }

  render() {
    return (
      <div>
          <ListTitle value={this.state.title} numItems={this.state.items.length} saveList={this.saveList} updateTitle={this.updateTitle} />
          <SortableListContainer onSortEnd={this.onSortEnd} distance={1}>
          {this.state.items.map((item, i) => (
              <SortableListItem
                key={item}
                value={item}
                index={i}
                onEnter={(a)=>{console.log(a)}}
                onDelete={this.onDelete}/>))}
          </SortableListContainer>
          <ListItem newListItem={true} onEnter={this.addNewItem}/>
      </div>
      );
  }
}

class InstaListFormTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: true,
      items: [],
      allItems: [],
      title: "New Title"
    }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({items}) => ({
      items: arrayMoveImmutable(items, oldIndex, newIndex),
    }));
  };

  addNewItem = (newValue) => {
    this.setState({allItems: [...this.state.allItems, newValue]});

    if (this.state.showAll) {
    this.setState({items: [...this.state.items, newValue]});
    }
  }

  updateTitle = (titleUpdateEvent) => {
    this.setState({title: titleUpdateEvent.target.value});
  }

  saveList = () => {
    var newListId = createNewInstaList(this.state.title, this.state.items);

    this.props.history.push("/instalist/" + newListId);
  }

  onDelete = (index) => {
    var newItemsList = this.state.items;
    newItemsList.splice(index, 1);
    this.setState({items: newItemsList});
  }

  toggleList = () => {
    this.setState({showAll: !this.state.showAll}, (newState) => {
      if (this.state.showAll) {
        this.setState({items: this.state.allItems});
      } else {
        if (this.state.allItems.length > 0) {
          this.setState({items: [this.state.allItems[0]]});
        } else {
          this.setState({items: []});
        }
      }
    });
  }

  render() {
    return (
      <div>
          <ListTitle value={this.state.title}  numItems={this.state.items.length} saveList={this.saveList} updateTitle={this.updateTitle} />
          <ListControls toggleList={this.toggleList} isToggled={!this.state.showAll}/>
          <SortableListContainer onSortEnd={this.onSortEnd} distance={1}>
          {this.state.items.map((item, i) => (
              <SortableListItem
                key={item}
                value={item}
                index={i}
                onEnter={(a)=>{console.log(a)}}
                onDelete={this.onDelete}/>))}
          </SortableListContainer>
          {
            this.state.showAll ? 
            <ListItem newListItem={true} onEnter={this.addNewItem}/>
            :
            <div></div>
          }
      </div>
      );
  }
}

export default withRouter(InstaList);
export const InstaListForm = withRouter(InstaListFormTemplate);
