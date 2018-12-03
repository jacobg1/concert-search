/* eslint-disable no-console */
import React, { Component } from 'react';
import SelectList from './SelectList';
import ConcertSearchResults from './ConcertSearchResults';
import axios from 'axios'

class HomeContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            searchResults: null
        };
        this.makeSearch = this.makeSearch.bind(this)
    }
    makeSearch(e, searchArtist, searchYear) {
        e.preventDefault()
       if(searchArtist !== '') {
           let formatArtist = searchArtist.replace(/ /g, '+')
           console.log(formatArtist)
           console.log(searchYear)
           let url = 'http://localhost:3000/meta/' + formatArtist + '/' + searchYear
           console.log(url)
           axios({
               method: 'GET',
               url: url,
               dataType: 'jsonp'
            
           }).then((response) => {
            //    if(response.status === 200) {
                   this.setState({
                       searchResults: response.data
                   }, function() {
                       console.log(this.state.searchResults)
                   })
            //    }
           }).catch(function(error) {
               console.log(error)
           })
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