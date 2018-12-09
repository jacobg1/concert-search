/* eslint-disable no-console */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import spinner from '../images/spinner.gif'
import Player from './Player'
import TrackList from './TrackList'

class IndividualConcert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            trackList: null,
            metaData: {},
            songIndex: null
        }
        this.setSong = this.setSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
    }

    componentDidMount () {
        
        // make api call for concert data on component mount
        let url = 'http://localhost:3000/concert/' + this.props.concertToPlay
        // console.log(url)

        axios({
            method: 'GET',
            url: url,
            dataType: 'jsonp'
        }).then((response) => {

            // console.log(response)
            let { metaData } = response.data
            let { trackList } = response.data

            this.setState({
                loading: false,
                trackList: trackList,
                selectedSong: '',
                metaData: {
                    coverage: metaData.coverage,
                    venue: metaData.venue,
                    runtime: metaData.runtime,
                    date: metaData.date,
                    lineage: metaData.lineage,
                    notes: metaData.notes,
                    source: metaData.source
                }
            }, () => {
                // console.log(this.state.trackList, this.state.metaData)
            })

        }).catch(function (error) {
            console.log(error)
        })
    }

    setSong(selectedSong, songIndex) {
        console.log(selectedSong, songIndex)
        this.setState({
            selectedSong: selectedSong,
            songIndex: songIndex
        }, () => {
            console.log('here', songIndex)
        })
    }

    nextSong () {
        this.setState({
            songIndex: this.state.songIndex + 1
        }, () => {
            let trackListLength = Object.keys(this.state.trackList).length
            if (this.state.songIndex === trackListLength) {
                this.setState({
                    selectedSong: this.state.trackList[0].playUrl
                })
            } else {
                this.setState({
                    selectedSong: this.state.trackList[this.state.songIndex].playUrl
                })
            }
            
        })
    }

    render() {

        let { coverage } = this.state.metaData,
            { venue } = this.state.metaData,
            { runtime } = this.state.metaData,
            { date } = this.state.metaData,
            { lineage } = this.state.metaData,
            { notes } = this.state.metaData,
            { source } = this.state.metaData

        return (
            <>  
                <div>
                {
                    this.state && this.state.loading &&
                        <img src={ spinner } alt="" />
                }
                {
                    this.state && this.state.metaData &&
                        <div>
                            <p>{ coverage ? coverage : '' }</p>
                            <p>{ venue ? venue : '' }</p>
                            <p>{ runtime ? runtime : '' }</p>
                            <p>{ date ? date : '' }</p>
                            <p>{ lineage ? lineage : '' }</p>
                            <p>{ notes ? notes : '' }</p>
                            <p>{ source ? source : '' }</p>
                        </div>
                }
                {
                    this.state && this.state.trackList &&
                        <TrackList
                            trackList={ this.state.trackList }
                            setSong={ this.setSong }
                        />
                }
                
                {
                    this.state && this.state.selectedSong &&
                        <Player
                            songToPlay={ this.state.selectedSong }
                            nextSong={ this.nextSong }
                        />
                }
                
                    
                    <button onClick={() => this.props.showConcertScreen()}>back</button>
                    <button onClick={() => this.nextSong()}>Next Song</button>

                </div>
            </>
        );
    }
}

export default IndividualConcert;

IndividualConcert.propTypes = {
    showConcertScreen: PropTypes.func.isRequired,
    concertToPlay: PropTypes.string.isRequired
}