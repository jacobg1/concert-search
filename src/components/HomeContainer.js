/* eslint-disable no-console */
import React, { Component } from 'react';
import SelectList from './SelectList';
import ConcertSearchResults from './ConcertSearchResults';
import IndividualConcert from './IndividualConcert';

import axios from 'axios'

class HomeContainer extends Component {
    constructor () {
        super()
        this.state = {
            searchResults: null,
            showIndividualConcert: false,
            selectedArtist: '',
            selectedYear: ''
        }
        this.makeSearch = this.makeSearch.bind(this)
        this.showConcertScreen = this.showConcertScreen.bind(this)
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
                    selectedArtist: searchArtist,
                    selectedYear: searchYear
                })
        
           }).catch(function(error) {
               console.log(error)
           })
       }
    }

    showConcertScreen () {
        this.setState({ showIndividualConcert: !this.state.showIndividualConcert })
    }

    render() {

        return (
            <>                        
                <SelectList
                    makeSearch={ this.makeSearch }
                />

                <h2>Searching for:</h2>
                
                    {
                        this.state && this.state.selectedArtist &&
                            <span style={{ fontSize: 25 }}>{ this.state.selectedArtist }</span>
                    }

                    {
                        this.state && this.state.selectedYear &&
                            <span style={{ fontSize: 25 }}>, { this.state.selectedYear }</span>
                    }

                        { 
                            this.state && this.state.searchResults && !this.state.showIndividualConcert && 

                                <ConcertSearchResults 
                                    concerts={ this.state.searchResults }
                                    showConcertScreen= { this.showConcertScreen }
                                />
                        }

                        {
                            this.state && this.state.showIndividualConcert &&

                                <IndividualConcert 
                                    showConcertScreen={ this.showConcertScreen }
                                />
                        }

            </>
        );
    }
}
export default HomeContainer;