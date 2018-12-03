/* eslint-disable no-console */
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
    makeSearch(e, searchArtist, searchYear) {
        e.preventDefault()
       if(searchArtist !== '') {
           let formatArtist = searchArtist.replace(/ /g, '+')
           console.log(formatArtist)
           console.log(searchYear)
           let url = 'http://localhost:3000/meta/' + formatArtist + '/' + searchYear
           console.log(url)
       }
    }
    render() {
        return (
            <>
                <h1>{ this.state.searchChoice }</h1>
                <SelectList
                  makeSearch={ this.makeSearch }
                 />
                <ConcertSearchResults />
            </>
        );
    }
}
export default HomeContainer;