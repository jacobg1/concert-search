import React, { Component } from 'react';
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import styles from './styles/Header.module.scss'

class Header extends Component {
    render () {
        return (
            <>
              <Helmet>
                  <title>Concert Search</title>
                  <link rel="canonical" href="http://concert-search.surge.sh" />
              </Helmet>

              <header>
                    <h1>Concert Search</h1>
              </header>
            </>
        );
    }
}

export default Header;