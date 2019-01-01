/* eslint-disable no-console */
import React, { Component } from 'react';
import SelectList from './SelectList';
import ConcertSearchResults from './ConcertSearchResults';
import IndividualConcert from './IndividualConcert';
import styles from './styles/HomeContainer.module.scss'
import right from '../images/arrow_right.svg'
import left from '../images/arrow_left.svg'
import axios from 'axios'
import recordPlayer from '../images/vynil.svg'

class HomeContainer extends Component {
    constructor () {
        super()
        this.state = {
            searchResults: null,
            switchScreens: false,
            selectedArtist: '',
            selectedYear: '',
            selectedConcert: '',
            searchMade: false
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
                    selectedYear: searchYear,
                    switchScreens: false,
                    searchMade: true
                })
        
           }).catch(function(error) {
               console.log(error)
           })
       }
    }
    
    showConcertScreen (selectedConcert) {

        // return to top of screen
        window.scroll(0, 0)

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
                    
                   
                
                

                {/* {
                    this.state && this.state.selectedArtist &&
                    <span style={{ fontSize: 25 }}>{this.state.selectedArtist}</span>
                }

                {
                    this.state && this.state.selectedYear &&
                    <span style={{ fontSize: 25 }}>, {this.state.selectedYear}</span>
                } */}

                {
                    this.state &&
                        <SelectList
                            makeSearch={this.makeSearch}
                        />
                } 
                {
                    this.state && !this.state.searchMade &&
                        <div className={ styles.recordHolder }>
                            <img className={ styles.record } src={ recordPlayer } alt='record-icon'></img>
                        </div>
                }
                <div className={ styles.homeContainer }>
                <span
                    className={
                        `${styles.showConcertButton}
                                ${!this.state.selectedConcert ? styles.hide : ''}`
                    }
                    onClick={() => this.switchScreens()}
                >
                    {
                        this.state.switchScreens
                            ? <img className={styles.leftArrow} src={left} alt="left-arrow"></img>
                            : <img className={styles.rightArrow} src={right} alt="right-arrow"></img>

                    }
                </span>
                <div className={
                    `${styles.concertResults} 
                     ${this.state.switchScreens ? styles.hide : '' }`
                }>
                         
                   
                    

                    { 
                        this.state && this.state.searchResults && 

                            <ConcertSearchResults 
                                concerts={ this.state.searchResults }
                                showConcertScreen= { this.showConcertScreen }
                            />
                    }

                </div>  
                </div>
                <div className={
                    `${styles.individualConcert} 
                     ${!this.state.switchScreens ? styles.hide : ''}` 
                }>
                    
                    
                        
                    {
                        this.state && 

                            <IndividualConcert 
                                selectedArtist={ this.state.selectedArtist }
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