import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import styles from './styles/Header.module.scss'

class Header extends Component {
    render () {
        return (
            <>
              <Helmet>
                  <title>My Title</title>
                  <link rel="canonical" href="http://mysite.com/example" />
              </Helmet>

              <header>
                  <h1>CRUNCH2.0</h1>
              </header>
            </>
        );
    }
}

export default Header;