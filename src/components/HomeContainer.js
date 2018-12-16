/* eslint-disable no-console */
import React, { Component } from 'react';
import SelectList from './SelectList';
import ConcertSearchResults from './ConcertSearchResults';
import IndividualConcert from './IndividualConcert';
import styles from './styles/HomeContainer.module.scss'

import axios from 'axios'

class HomeContainer extends Component {
    constructor () {
        super()
        this.state = {
            searchResults: null,
            switchScreens: false,
            selectedArtist: '',
            selectedYear: '',
            selectedConcert: ''
        }
        // binding 'this' to passed down functions to keep context
        this.makeSearch = this.makeSearch.bind(this)
        this.showConcertScreen = this.showConcertScreen.bind(this)
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
        // show selected concert
        let { switchScreens } = this.state
        this.setState({ 
            selectedConcert: selectedConcert,
            switchScreens: !switchScreens  
        }, () => {
            // console.log(this.state.selectedConcert)
        })
    }

    switchScreens () {
        console.log('switch')
        let { switchScreens } = this.state
        // toggle individual concert screen
        this.setState({ 
            switchScreens: !switchScreens 
        }, () => {
            // console.log(this.state.selectedConcert)
        })
    }

    render() {

        return (
            <>  
                <div className={
                    `${styles.concertResults} 
                     ${this.state.switchScreens ? styles.hide : styles.show }`
                }>
                    {
                        this.state && this.state.selectedArtist &&
                        <span style={{ fontSize: 25 }}>{this.state.selectedArtist}</span>
                    }

                    {
                        this.state && this.state.selectedYear &&
                        <span style={{ fontSize: 25 }}>, {this.state.selectedYear}</span>
                    }
                    
                    {
                        this.state &&
                            <SelectList
                                makeSearch={this.makeSearch}
                            />
                    }       

                    <button
                        onClick={() => this.switchScreens()}
                    >
                        search
                    </button>

                    { 
                        this.state && this.state.searchResults && 

                            <ConcertSearchResults 
                                concerts={ this.state.searchResults }
                                showConcertScreen= { this.showConcertScreen }
                            />
                    }

                </div>  

                <div className={
                    `${styles.individualConcert} 
                     ${this.state.switchScreens ? styles.show : styles.hide}` 
                }>
                    
                    <button
                        onClick={() => this.switchScreens()}
                    >
                        player
                    </button>
                        
                    {
                        this.state && this.state.selectedConcert &&

                            <IndividualConcert 
                                showConcertScreen={ this.showConcertScreen }
                                concertToPlay={ this.state.selectedConcert }
                            />
                    }
                </div>    
            </>
        );
    }
}
export default HomeContainer;