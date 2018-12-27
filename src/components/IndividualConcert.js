/* eslint-disable no-console */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import spinner from '../images/ripple.svg'
import Player from './Player'
import TrackList from './TrackList'
import PlayList from './PlayList'
import unique from '../util/uniqueArray'
import styles from './styles/IndividualConcert.module.scss'

class IndividualConcert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            trackList: null,
            metaData: {},
            songIndex: null,
            playListSongIndex: null,
            playList: [],
            isPlayListSong: null,
            selectedSong: '',
            playListScreen: false
        }
        this.setSong = this.setSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.prevSong = this.prevSong.bind(this)
        this.addToPlayList= this.addToPlayList.bind(this)
        this.setPlayListSong = this.setPlayListSong.bind(this)
        this.removeFromPlayList = this.removeFromPlayList.bind(this)
        this.checkPlayList = this.checkPlayList.bind(this)

    }
    makeConcertSearch (concert) {
        // make api call for concert data on component mount
        let url = 'http://localhost:3000/concert/' + concert
        this.setState({ loading: true}, () => {
            axios({
                method: 'GET',
                url: url,
                dataType: 'jsonp'
            }).then((response) => {

                let { metaData } = response.data
                let { trackList } = response.data

                this.setState({
                    loading: false,
                    trackList: trackList,

                    metaData: {
                        coverage: metaData.coverage,
                        venue: metaData.venue,
                        runtime: metaData.runtime,
                        date: metaData.date,
                        lineage: metaData.lineage,
                        notes: metaData.notes,
                        source: metaData.source
                    }
                })
            }).catch(function (error) {
                console.log(error)
            })
        })  
    }

    // logic to pull playlist from local storage
    setPlayList () {
        let storedPlayList = localStorage.getItem('playlist')

        if (storedPlayList) {
            let parsePlayList = JSON.parse(storedPlayList)
            this.setState({
                playList: [...parsePlayList]
            }, () => {
                console.log(this.state.playList.length)
            })
        }
    }

    // when component mounts make concert search
    // and set playlist if it exists
    componentDidMount () {
        this.makeConcertSearch(this.props.concertToPlay)
        this.setPlayList()
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.concertToPlay !== this.props.concertToPlay) {
            this.makeConcertSearch(this.props.concertToPlay)
        }
    }
    
    setSong(selectedSong, songIndex) {
        // console.log(selectedSong, songIndex)
        this.setState({
            selectedSong: selectedSong,
            songIndex: songIndex,
            isPlayListSong: false
            
        }, () => {
            // console.log('here', songIndex)
            // console.log(this.state.isPlayListSong)
        })
    }

    setPlayListSong(playListSong, selectedIndex) {
        // console.log(playListSong)
        this.setState({ 
                selectedSong: playListSong, 
                playListSongIndex: selectedIndex,
                isPlayListSong: true    
            }, () => {
            // console.log(this.state.playListSongIndex)
        })
    }

    nextSong (index) {
        
        let { songIndex } = this.state

        // process next song if the user is listing to a tracklist song
        if (!this.state.isPlayListSong) {

            let { trackList } = this.state,
                trackListLength = Object.keys(trackList).length

            if (songIndex === (trackListLength - 1)) {

                this.setSong(trackList[0].playUrl, 0)
            } else {
                this.setSong(trackList[songIndex + 1].playUrl, (songIndex + 1))
            }

            // switch back to tracklist screen
            this.setState({
                playListScreen: false
            })

        // process next song if user is listing to a playlist song
        } else {

            let { playList } = this.state,
                playListLength = Object.keys(playList).length

            // if user is on last track, go to beginning 
            if (index === (playListLength - 1)) {
                this.setPlayListSong(playList[0].songUrl, 0)

            // otherwise just go to next song
            } else {
                this.setPlayListSong(playList[index + 1].songUrl, (index + 1))
            }

            // switch to playlist screen
            this.setState({
                playListScreen: true
            })
        }
    }

    prevSong(index) {
  
        let { songIndex } = this.state

        // process next song if the user is listing to a tracklist song
        if (!this.state.isPlayListSong) {

            let { trackList } = this.state,
                trackListLength = Object.keys(trackList).length

            // if user is on first track, go to last track
            if (songIndex === 0) {
                this.setSong(trackList[trackListLength - 1].playUrl, (trackListLength - 1))

            // otherwise just go to previous song
            } else {
                this.setSong(trackList[songIndex - 1].playUrl, (songIndex - 1))
            }

            // switch to tracklist screen
            this.setState({
                playListScreen: false
            })

        // process previous song if user is listing to a playlist song
        } else {

            let { playList } = this.state,
                
                playListLength = Object.keys(playList).length

            // if user is on first track, go to last track
            if (index === 0) {
                this.setPlayListSong(playList[playListLength - 1].songUrl, (playListLength - 1))

            // otherwise just go to previous song
            } else {
                this.setPlayListSong(playList[index - 1].songUrl, (index - 1))
            }

            // switch to playlist screen
            this.setState({
                playListScreen: true
            })
        }
    }

    addToPlayList(songIndex) {

        let name = this.state.trackList[songIndex].title
            ? this.state.trackList[songIndex].title
            : this.state.trackList[songIndex].name
            ? this.state.trackList[songIndex].name
            : ''

        let { trackList } = this.state

        let newTrack = [{
            name: name,
            songUrl: trackList[songIndex].playUrl,
        }]
        
        let newTrackArray = [...this.state.playList, ...newTrack]

        this.setState({
            playList: unique(newTrackArray, 'songUrl'),

        }, () => {

            this.state.playList.forEach((song, index) => {
                song.id = index
            });

            localStorage.setItem('playlist', JSON.stringify(this.state.playList))

        })
    }

    // function to remove a song from the playlist
    removeFromPlayList(songIndex) {
        // console.log(songIndex, this.state.songIndex)

        let newArray = this.state.playList.filter((item, i) => i !== songIndex)
       
        newArray.forEach((song, index) => {
            song.id = index
        });

        if(songIndex < this.state.playListSongIndex) {
            
            this.setState({
                playListSongIndex: this.state.playListSongIndex - 1
            })
        }
        this.setState({
            playList: newArray
        }, () => {

            if(!this.state.playList.length) {
                this.setState({
                    playListScreen: false
                })
            }

            let stringPlayList = JSON.stringify(this.state.playList)

            localStorage.setItem('playlist', stringPlayList)

        })
    }

    // function to check if song is in playlist
    // if song exists in playlist return true
    // used to change plus sign to check mark in tracklist
    checkPlayList (url) {

        let { playList } = this.state

        let stringPlayList = JSON.stringify(playList)

        if(stringPlayList.indexOf(url) > -1) {
            return true
        }
        // console.log(url)
    }
    playListSwitch () {

        let { playListScreen } = this.state

        this.setState({
            playListScreen: !playListScreen 
        })
    }

    // function to check playlist length
    // returns true if playlist length not zero
    checkPlayListLength () {
       
        let { playList } = this.state,
            length = Object.keys(playList).length

        if (length) {
            return true
        } 
       
    }
    
    render() {

        let { coverage } = this.state.metaData,
            { venue } = this.state.metaData,
            // { runtime } = this.state.metaData,
            { date } = this.state.metaData
            // { lineage } = this.state.metaData,
            // { notes } = this.state.metaData,
            // { source } = this.state.metaData

        return (
            <>  
                {
                    this.state && this.state.loading &&
                        <img className={ styles.loader } src={ spinner } alt="loading..." />
                }

                {
                    this.state && this.state.metaData && !this.state.loading &&
                        <div className={ styles.meta }>
                            <p>{ coverage ? coverage : '' } { venue ? ` - ${venue}` : '' }</p>
                            {/* { runtime ? <p>Runtime: { runtime }</p> : '' } */}
                            { date ? <p>{ date }</p> : '' }
                        </div>
                }   

                {
                    this.state && !this.state.loading && this.checkPlayListLength() &&
                    <p
                        className={this.state.playListScreen ? styles.leftArrow : styles.rightArrow}
                        onClick={() => this.playListSwitch()}
                    >
                        {
                             this.state.playListScreen 
                                ? 'tracks'
                                : 'playlist'   
                        }
                    </p>
                }
                
                {
                    this.state && this.state.trackList && !this.state.loading && !this.state.playListScreen &&
                        <TrackList
                            trackList={ this.state.trackList }
                            playList={ this.state.playList }
                            setSong={ this.setSong }
                            addToPlayList={ this.addToPlayList }
                            checkType={ this.state.isPlayListSong }
                            selectedSong={ this.state.selectedSong }
                            checkPlayList = { this.checkPlayList }
                        />
                }
                
                {
                    this.state && this.state.playList && !this.state.loading && this.state.playListScreen &&
                        <PlayList 
                            removeFromPlayList={ this.removeFromPlayList }
                            playList={ this.state.playList }
                            setPlayListSong={ this.setPlayListSong }
                            selectedSong={ this.state.selectedSong }
                            checkType={ this.state.isPlayListSong }
                        />
                }   

                {
                    this.state && this.state.selectedSong && !this.state.loading &&
                        <Player
                            songToPlay={ this.state.selectedSong }
                            playListSongIndex={ this.state.playListSongIndex }
                            nextSong={ this.nextSong}
                            prevSong={ this.prevSong }
                        />
                }               
            </>
        );
    }
}

export default IndividualConcert

IndividualConcert.propTypes = {
    concertToPlay: PropTypes.string.isRequired,
    showConcertScreen: PropTypes.func.isRequired,
}