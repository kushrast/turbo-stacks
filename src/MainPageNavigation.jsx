import React from 'react';


class MainPageNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render () {
    return (
      <div>
        <div class="columns is-centered" style={{marginTop: "35px"}}>
          <div class="column is-7 columns">
            <div class="column is-6">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">
                    InstaList
                  </p>
                  <button class="card-header-icon" aria-label="more options">
                    <span class="icon">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </header>
                <div class="card-content">
                  <div class="content">
                    <div>
                      <a class="button is-light is-fullwidth" href="/instalist/new_list">New InstaList</a>
                    </div>
                    <div style={{marginTop: "8px"}}>
                      <a class="button is-light is-fullwidth">View All</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
  }
}

export default MainPageNavigation;