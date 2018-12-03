import React, { Component } from 'react';
import SelectList from './SelectList';
import ConcertSearchResults from './ConcertSearchResults';

class HomeContainer extends Component {
    constructor () {
        super();
        this.state = {
            searchChoice: 'test'
        };
    }
    render() {
        return (
            <>
                <h1>{ this.state.searchChoice }</h1>
                <SelectList />
                <ConcertSearchResults />
            </>
        );
    }
}
export default HomeContainer;