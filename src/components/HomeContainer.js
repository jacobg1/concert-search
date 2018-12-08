/* eslint-disable no-console */
import React, { Component } from 'react';
import SelectList from './SelectList';
import ConcertSearchResults from './ConcertSearchResults';
import axios from 'axios'

class HomeContainer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            searchResults: null,
        }
        this.makeSearch = this.makeSearch.bind(this)
    }
    makeSearch(e, searchArtist, searchYear) {
        
       e.preventDefault()
       
       if(searchArtist !== '') {

           let formatArtist = searchArtist.replace(/ /g, '+')

           let url = 'http://localhost:3000/meta/' + formatArtist + '/' + searchYear

           axios({
               method: 'GET',
               url: url,
               dataType: 'jsonp'
           }).then((response) => {

                this.setState({
                    searchResults: response.data,
                })
        
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

                    { 
                        this.state && this.state.searchResults && 
                        
                            <ConcertSearchResults 
                                concerts={ this.state.searchResults }
                            />
                    }
            </>
        );
    }
}
export default HomeContainer;