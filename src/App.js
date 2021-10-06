import logo from './logo.svg';
import './App.css';
import {Heading, Icon} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import { useState, useEffect} from 'react';
import React from 'react';
import Typed from "typed.js";

import 'bulma/css/bulma.min.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseOverIcon: false
    };
  }

  toggleIsMouseOverIcon = () => {
    this.setState({isMouseOverIcon: !this.state.isMouseOverIcon});
  }

  getIconColor = () => {
    if (this.state.isMouseOverIcon) {
      return "#D4EBD2";
    } 
    return "#DDDDDD";
  }

  render () {
    return (
      <div>
        <div class="columns is-centered">          
          <div class="column is-1">
            <FontAwesomeIcon icon={faGripHorizontal} size="6x" color={this.getIconColor()} onMouseEnter={this.toggleIsMouseOverIcon} onMouseLeave={this.toggleIsMouseOverIcon}/>
          </div>
        </div>
      </div>
      );
  }
}

class TimeForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {value: 0};
    this.updateTimeAvailable = this.props.updateTimeAvailable;
  }

  componentDidMount() {
    this.setupAnimatedPrompt();
  }

  setupAnimatedPrompt() {
    const options = {
      strings: ["How much time do you have right now?"],
      typeSpeed: 40,
      startDelay: 0,
      showCursor: true
    };
    this.typed = new Typed(this.el, options);
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    console.log(this.state.value);
    this.updateTimeAvailable(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
    <div>
      <div className="columns is-centered">
        <div class="column is-8 has-text-centered">
          <span className="title is-1" ref={(el) => {this.el=el;}} style={{whitespace: "pre", color: "#5D5D5D"}}></span>
        </div>
      </div>
      <div className="columns is-centered">
        <div class="column is-2" style={{paddingTop: "20px"}}>
          <form onSubmit={this.handleSubmit}>
            <div class="field is-grouped">
              <p class="control">
                <input class="input" type="number" placeholder="(minutes)" value={this.state.value} onChange={this.handleChange}/>
              </p>
              <p class="control">
                <a class="button is-success" onClick={this.handleSubmit}>
                  Search
                </a>
              </p>
            </div>
            <div style={{paddingTop:"5px", color: "grey", fontSize: "15px"}} className="has-text-centered">
              (Minutes)
            </div>
          </form>
        </div>
      </div>
    </div>
    );
  }
}

class KnapsackCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div class="card" style={{padding: "20px 30px 20px 30px"}}>
          <div class="card-content">
            <p class="title block">
              {this.props.activity.name}
            </p>
            <p class="subtitle block">
              Details: So and So
            </p>
          </div>
          <footer class="card-footer">
            <p class="card-footer-item">
              <span>
                Time: {this.props.activity.time}
              </span>
            </p>
            <p class="card-footer-item">
              <a onClick={this.props.changeActivity}>
                Spin again
              </a>
            </p>
          </footer>
        </div>
      );
  }
}

class KnapsackResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timeAvailable: this.props.timeAvailable,
      allActivities: [{name: "thing1", time:50}, {name: "thing2", time:40}, {name: "thing3", time:30}, {name: "thing4", time:20}],
      validActivities: [],
      selectedActivityIndex: 0
    }
  }

  componentDidMount() {
    var validActivities = [];
    this.state.allActivities.forEach((activity, i) => {
      if (activity.time <= this.state.timeAvailable) {
        validActivities.push(activity);
      }
    });

    this.setState({validActivities: validActivities, timeAvailable: this.props.timeAvailable}, this.selectActivity);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.timeAvailable !== this.props.timeAvailable) {

      var validActivities = [];
      this.state.allActivities.forEach((activity, i) => {
        if (activity.time <= this.state.timeAvailable) {
          validActivities.push(activity);
        }
      });

      this.setState({validActivities: validActivities, timeAvailable: this.props.timeAvailable}, this.selectActivity);
    }
  }

  selectActivity = () => {
    if (this.state.validActivities.length > 0) {
      var index = Math.floor(Math.random() * this.state.validActivities.length);
      this.setState({selectedActivityIndex: index});
    }
  }

  getActivity = () => {
    if (this.state.validActivities.length > 0 && this.state.selectedActivityIndex < this.state.validActivities.length) {
      return this.state.validActivities[this.state.selectedActivityIndex];
    } else {
      return "";
    }
  }

  render() {
    return (
    <div className="columns is-centered">
      <KnapsackCard activity={this.getActivity()} changeActivity={this.selectActivity}/>
    </div>
    );
  }
}

class Knapsack extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      showForm: true,
      timeAvailable: 0
    }
  }

  getStyles() {
    return {
      paddingTop: "125px"
    }
  }

  updateTimeAvailable = (newTimeAvailableMinutes) => {
    this.setState({timeAvailable: newTimeAvailableMinutes});
    this.setState({showForm: false});

    console.log(newTimeAvailableMinutes);
  }

  resetTimeAvailable = () => {
    this.setState({timeAvailable: 0, showForm: true});
  }

  render() {
    return (
      <div style={this.getStyles()}>
      { this.state.showForm ?
        <TimeForm updateTimeAvailable={this.updateTimeAvailable}/> :
        <KnapsackResult timeAvailable={this.state.timeAvailable} resetTimeAvailable={this.resetTimeAvailable}/>
      }
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
          <Knapsack/>
        </div>
      </section>
    </div>
  );
}

export default App;
