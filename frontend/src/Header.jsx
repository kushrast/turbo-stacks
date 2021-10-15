import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import React from 'react';


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
          <div class="column is-2">
            <a class="header-text" href="/">
              <FontAwesomeIcon icon={faLayerGroup} size="2x" color="#417dc1"/> turbo
            </a>
          </div>
          <div class="column is-auto has-text-centered">
            <p>
              <a href="/">
                <FontAwesomeIcon icon={faGripHorizontal} size="5x" color={this.getIconColor()} onMouseEnter={this.toggleIsMouseOverIcon} onMouseLeave={this.toggleIsMouseOverIcon}/>
              </a>
            </p>
          </div>
          <div class="column is-2 has-text-centered">
          </div>
        </div>
      </div>
      );
  }
}

export default Header;