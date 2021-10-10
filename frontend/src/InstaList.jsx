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

const SortableListItem = sortableElement(({value, onEnter, sortIndex, onDelete}) => (
  <li class="list-item-container">
    <ListItem value={value} onEnter={onEnter} index={sortIndex} onDelete={onDelete}/>
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
        <button class={!this.props.persist ? "button is-danger is-light" : "button is-primary is-light"} style={{marginLeft: "10px"}} onClick={this.props.togglePersist}>
          { !this.props.persist ? 
            <span> Don't persist </span> :
            <span> Persist </span>
          }
        </button>
        </div>
      </div>
      );
  }
}

class BaseInstaList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAll: true,
    }
  }

  toggleList = () => {
    this.setState({showAll: !this.state.showAll});
  }

  addNewItem = (newValue) => {
    this.setState({items: [...this.state.items, newValue]});
  }

  render() {
    return (
      <div>
          <ListTitle value={this.props.title}  numItems={this.props.items.length} saveList={this.props.saveList} updateTitle={this.props.updateTitle} />
          <ListControls toggleList={this.toggleList} isToggled={!this.state.showAll} togglePersist={this.props.togglePersist} persist={this.props.persist}/>
          <SortableListContainer onSortEnd={this.props.onSortEnd} distance={1}>
          {
            this.state.showAll ?
            (this.props.items.map((item, i) => (
                <SortableListItem
                  key={item}
                  value={item}
                  index={i}
                  sortIndex={i}
                  onDelete={this.props.onDelete}/>)))
            :
            (this.props.items.length > 0 ? 
              <SortableListItem
                  key={this.props.items[0]}
                  value={this.props.items[0]}
                  index={0}
                  onDelete={this.props.onDelete}/>
              :
              <div></div>)
          }
          </SortableListContainer>
          {
            this.state.showAll ? 
            <ListItem newListItem={true} onEnter={this.props.addNewItem}/>
            :
            <div>
              {this.props.items.length == 0 ? 
                <span>
                  <div class="columns is-centered">
                    <div class="column is-7 has-text-centered" style={{fontStyle:"italic", color: "grey"}}>
                      No items in list
                    </div>
                  </div>
                </span>: 
                <span></span>}
            </div>
          }
      </div>
      );
  }
}

class InstaList extends React.Component {
  constructor(props) {
    super(props);

    var savedListData = getInstaList(props.match.params.id);

    this.state = {
      persist: savedListData.persist,
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

  togglePersist = () => {
    this.setState({persist: !this.state.persist});
  }

  render() {
    return (
      <BaseInstaList title={this.state.title} items={this.state.items} saveList={this.saveList} updateTitle={this.updateTitle} toggleList={this.toggleList} onSortEnd={this.onSortEnd} onDelete={this.onDelete} addNewItem={this.addNewItem} persist={this.state.persist} togglePersist={this.togglePersist}/>
      );
  }
}

class InstaListFormTemplate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      persist: false,
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
    var newListId = createNewInstaList(this.state.title, this.state.items, this.state.persist);

    this.props.history.push("/instalist/" + newListId);
  }

  onDelete = (index) => {
    var newItemsList = this.state.items;
    newItemsList.splice(index, 1);
    this.setState({items: newItemsList});
  }

  togglePersist = () => {
    this.setState({persist: !this.state.persist});
  }

  render() {
    return (
      <BaseInstaList title={this.state.title} items={this.state.items} saveList={this.saveList} updateTitle={this.updateTitle} toggleList={this.toggleList} onSortEnd={this.onSortEnd} onDelete={this.onDelete} addNewItem={this.addNewItem}  persist={this.state.persist} togglePersist={this.togglePersist}/>
      );
  }
}

export default withRouter(InstaList);
export const InstaListForm = withRouter(InstaListFormTemplate);
