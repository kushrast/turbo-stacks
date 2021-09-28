import logo from './logo.svg';
import './App.css';
import {Heading, Icon} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLiraSign, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import 'bulma/css/bulma.min.css';

function Header(props) {
  const style = {
    paddingRight: "30px"
  };

  return (
    <div class="header">          
      <h1 class="title">
        <span class="icon-text">
          <span class="icon has-text-info">
            <FontAwesomeIcon icon={faSlidersH} size="lg"/>
          </span>
          <span style={{"paddingLeft": "10px"}}>Turbo Stacks</span>
        </span>
      </h1>
    </div>
    );
}

function ListCard(props) {
  
}

function App() {
  return (
    <div className="App">
      <section class="section">
        <div class="container">
          <Header/>
        </div>
      </section>
    </div>
  );
}

export default App;
