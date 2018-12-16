import React, { Component } from 'react';
import { Helmet } from "react-helmet";

class Header extends Component {
    render () {
        return (
            <>
              <Helmet>
                  <title>My Title</title>
                  <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>

              <header>
                  {/* <p>
                      Edit <code>src/App.js</code> and save to reload.
                  </p>
                  <a
                      className="App-link"
                      href="https://reactjs.org"
                      target="_blank"
                      rel="noopener noreferrer"
                  >
                      Learn React
                  </a> */}
              </header>
            </>
        );
    }
}

export default Header;