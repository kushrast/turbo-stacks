import logo from './logo.svg';
import './App.css';
import {Heading, Icon} from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faSlidersH } from '@fortawesome/free-solid-svg-icons';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {arrayMoveImmutable} from 'array-move';
import { useState, useEffect } from 'react';

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

const DraggableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <DraggableListItem key={`item-${value}`} index={index} value={value} />
      ))}
    </ul>
  );
});
const DraggableListItem = SortableElement(({value}) => 
  {
    return (
    <li>{value}</li>
    )
});


function ItemCard(props) {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']);
  const [showOptions, setShowOptions] = useState(false);
  const [showList, setShowlist] = useState(false);
  const [alwaysShowList, setAlwaysShowList] = useState(false);
  const [isBlurred, setBlur] = useState(true);
  const [alwaysBlur, setAlwaysSetBlur] = useState(true);

  const onSortEnd = ({oldIndex, newIndex}) => {
    setItems(arrayMoveImmutable(items, oldIndex, newIndex));
  };

  const toggleOptions = () => {
    setShowOptions(!showOptions);

    if (!alwaysShowList) {
      setShowlist(false);
    }

    if (!showOptions) {
      setBlur(false);
    } else {
      setBlur(true);
    }
  }

  const seeAll = () => {
    if (!alwaysShowList) {
      setShowlist(!showList);
    }
  }

  const toggleAlwaysShowList = () => {
    if (!alwaysShowList) {
      setShowlist(true);
    }

    setAlwaysShowList(!alwaysShowList);
  };

  const getBlurStyle = () => {
    const styles = {}
    if (isBlurred) {
      styles["WebkitFilter"] =  "blur(5px)";
    }

    styles["cursor"] = "pointer";

    return styles;
  }

  const getStyleForSeeAll = () => {
    const styles = {};
    if (alwaysShowList) {
      styles["PointerEvents"] = "none";
      styles["color"] = "grey";
      styles["cursor"] = "default";
    }

    return styles;
  }

  const toggleBlur = () => {
    if (!showList) {
      setBlur(!isBlurred);
    }
  }

  return (
      <div style={{paddingTop:"100px",marginLeft: "200px", marginRight: "200px"}}>
        <div class="columns">
          <div class="column is-2">
            <h6 class="title is-6 bird" style={{paddingTop: "35px"}}>Chores To Do</h6>
          </div>
          <div class="column">
          <div class="card">
            <div class="card-content">
              <div>
                <div class="columns">
                  <div class="column is-11" style={getBlurStyle()} onClick={toggleBlur}>
                    { !showList ? 
                    <div class="main-text">
                      <ul id="items">
                        <li class="ui-state-default" id="list-hover"><span class="ui-icon ui-icon-arrowthick-2-n-s"></span>Item 1</li>
                      </ul>
                    </div> :
                    <div class="list-all">
                      <DraggableList items={items} onSortEnd={onSortEnd} />
                    </div>
                      }
                  </div>
                  <div class="column is-1">
                    <span class="icon show-options" style={{cursor: "pointer"}} onClick={toggleOptions}>
                      <FontAwesomeIcon icon={faEllipsisV}/>
                    </span>
                  </div>
                </div>
            </div>
            </div>
            { showOptions ? 
            <footer class="card-footer">
                <a href="#" class="card-footer-item" id="see-all" onClick={seeAll} style={getStyleForSeeAll()}>See All</a>
                <a href="#" class="card-footer-item"  onClick={toggleAlwaysShowList}>{alwaysShowList ? <span>Don't Always Show List</span>: <span>Always Show List</span>}</a>
                <a href="#" class="card-footer-item">Keep Unblurred</a>
                <a href="#" class="card-footer-item">Delete</a>
            </footer>
            : null }
          </div>
          </div>
        </div>
      </div>
    );
}

function App() {
  return (
    <div className="App">
      <section class="section">
        <div class="container">
          <Header/>
          <ItemCard/>
        </div>
      </section>
    </div>
  );
}

export default App;
