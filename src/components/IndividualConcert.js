/* eslint-disable no-console */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import spinner from '../images/spinner.gif'
import Player from './Player'
import TrackList from './TrackList'
import PlayList from './PlayList'
import unique from '../util/uniqueArray'
import right from '../images/right-arrow.svg'
import left from '../images/left-arrow.svg'
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
        
        let storedPlayList = localStorage.getItem('playlist')

        if (storedPlayList) {
            let parsePlayList = JSON.parse(storedPlayList)
            this.setState({
                playList: [...parsePlayList]
            })
        }
    }
    componentDidMount () {
        this.makeConcertSearch(this.props.concertToPlay)
       
       
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
            console.log('here', songIndex)
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
            console.log(this.state.playListSongIndex)
        })
    }

    nextSong (index) {
        
        let { songIndex } = this.state
        console.log(songIndex, index)
        // process next song if the user is listing to a tracklist song
        if (!this.state.isPlayListSong) {

            let { trackList } = this.state,
                trackListLength = Object.keys(trackList).length

            if (songIndex === (trackListLength - 1)) {

                this.setSong(trackList[0].playUrl, 0)
            } else {
                this.setSong(trackList[songIndex + 1].playUrl, (songIndex + 1))
            }

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
        }
    }

    prevSong(index) {
        console.log(this.state.songIndex)
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
        }
    }

    addToPlayList(songIndex) {

        let name = this.state.trackList[songIndex].title
            ? this.state.trackList[songIndex].title
            : this.state.trackList[songIndex].name
            ? this.state.trackList[songIndex].name
            : ''

        let newTrack = [{
            name: name,
            songUrl: this.state.trackList[songIndex].playUrl,
        }]
        
        let newTrackArray = [...this.state.playList, ...newTrack]

        this.setState({
            playList: unique(newTrackArray, 'songUrl'),

        }, () => {
            this.state.playList.forEach((song, index) => {
                song.id = index
            });
            console.log(this.state.playList)

            localStorage.setItem('playlist', JSON.stringify(this.state.playList))
            // console.log(this.state.isPlayListSong)

        })
    }

    // function to remove a song from the playlist
    removeFromPlayList(songIndex) {
        console.log(songIndex, this.state.songIndex)
        let newArray = this.state.playList.filter((item, i) => i !== songIndex)
       
        newArray.forEach((song, index) => {
            song.id = index
        });
        if(songIndex < this.state.playListSongIndex) {
            console.log('true')
            this.setState({
                playListSongIndex: this.state.playListSongIndex - 1
            })
        }
        this.setState({
            playList: newArray
        }, () => {
            
            console.log(this.state.playList)
            localStorage.setItem('playlist', JSON.stringify(this.state.playList))
        })
    }

    playListSwitch () {

        let { playListScreen } = this.state

        this.setState({
            playListScreen: !playListScreen 
        })
    }

    render() {

        let { coverage } = this.state.metaData,
            { venue } = this.state.metaData,
            { runtime } = this.state.metaData,
            { date } = this.state.metaData
            // { lineage } = this.state.metaData,
            // { notes } = this.state.metaData,
            // { source } = this.state.metaData

        return (
            <>  
            
                {
                    this.state && this.state.loading &&
                        <img src={ spinner } alt="" />
                }

                {
                    this.state && this.state.metaData && !this.state.loading &&
                        <div className="meta">
                            <p>{ coverage ? coverage : '' } { venue ? ` - ${venue}` : '' }</p>
                            <p>{ runtime ? runtime : '' }</p>
                            <p>{ date ? date : '' }</p>
                        </div>
                }   
                {
                    this.state && !this.state.loading &&
                    <span

                        onClick={() => this.playListSwitch()}
                    >
                        {
                            this.state.playListScreen
                                ? <img className={styles.leftArrow} src={left} alt="left-arrow"></img>
                                : <img className={styles.rightArrow} src={right} alt="right-arrow"></img>

                        }
                    </span>
                }
                
                {
                    this.state && this.state.trackList && !this.state.loading && !this.state.playListScreen &&
                        <TrackList
                            trackList={ this.state.trackList }
                            setSong={ this.setSong }
                            addToPlayList={ this.addToPlayList }
                            checkType={ this.state.isPlayListSong }
                            selectedSong={ this.state.selectedSong }
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
                        songToPlay={this.state.selectedSong}
                        playListSongIndex={this.state.playListSongIndex}
                        nextSong={this.nextSong}
                        prevSong={this.prevSong}
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