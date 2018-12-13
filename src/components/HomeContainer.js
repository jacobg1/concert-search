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
            // showIndividualConcert: false,
            selectedArtist: '',
            selectedYear: '',
            selectedConcert: ''
        }
        // binding 'this' to passed down functions to keep context
        this.makeSearch = this.makeSearch.bind(this)
        this.showConcertScreen = this.showConcertScreen.bind(this)
        this.setConcert = this.setConcert.bind(this)
    }

    makeSearch(e, searchArtist, searchYear) {
        
       e.preventDefault()

       // only make search results if search artist has been selected
       if(searchArtist !== '') {

           // format artist name for api call
           let formatArtist = searchArtist.replace(/ /g, '+')

           // build api call url 
           let url = 'http://localhost:3000/meta/' + formatArtist + '/' + searchYear

           // make call then set state of results 
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
    
    showConcertScreen (selectedConcert) {
        // toggle individual concert screen
        this.setState({ 
            // showIndividualConcert: !this.state.showIndividualConcert,
            selectedConcert: selectedConcert 
        }, () => {
            console.log(this.state.selectedConcert)
        })
    }

    setConcert() {

    }

    render() {

        return (
            <>  
                {
                    this.state &&
                        <SelectList
                            makeSearch={this.makeSearch}
                        />
                }                      

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
                            this.state && this.state.searchResults && 

                                <ConcertSearchResults 
                                    concerts={ this.state.searchResults }
                                    showConcertScreen= { this.showConcertScreen }
                                    setConcert= { this.setConcert }
                                />
                        }

                        {
                            this.state && this.state.selectedConcert &&

                                <IndividualConcert 
                                    showConcertScreen={ this.showConcertScreen }
                                    concertToPlay={ this.state.selectedConcert }
                                />
                        }

            </>
        );
    }
}
export default HomeContainer;