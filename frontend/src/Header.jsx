import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons';
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
          <div class="column is-1 has-text-centered">
            <p className="header-text">
              {this.props.type}
            </p>
            <p>
              <a href="/">
                <FontAwesomeIcon icon={faGripHorizontal} size="5x" color={this.getIconColor()} onMouseEnter={this.toggleIsMouseOverIcon} onMouseLeave={this.toggleIsMouseOverIcon}/>
              </a>
            </p>
          </div>
        </div>
      </div>
      );
  }
}

export default Header;