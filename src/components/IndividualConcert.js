/* eslint-disable no-console */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import spinner from '../images/spinner.gif'
import Player from './Player'
import TrackList from './TrackList'
import PlayList from './PlayList'

class IndividualConcert extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            trackList: null,
            metaData: {},
            songIndex: null,
            playList: [],
            isPlayListSong: null,
            selectedSong: '',
        }
        this.setSong = this.setSong.bind(this)
        this.nextSong = this.nextSong.bind(this)
        this.prevSong = this.prevSong.bind(this)
        this.setPlayList = this.setPlayList.bind(this)
        this.setPlayListSong = this.setPlayListSong.bind(this)

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
            console.log(parsePlayList)
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
        console.log(selectedSong, songIndex)
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
        console.log(playListSong)
        this.setState({ 
                selectedSong: playListSong, 
                songIndex: selectedIndex,
                isPlayListSong: true    
            }, () => {
            console.log(this.state.selectedSong)
        })
    }

    nextSong () {
        let trackListLength = Object.keys(this.state.trackList).length
        let playListLength = Object.keys(this.state.playList).length

        if (!this.state.isPlayListSong) {
            if (this.state.songIndex === (trackListLength - 1)) {
                // this.setState({
                //     selectedSong: this.state.trackList[0].playUrl,
                //     songIndex: 0
                // })
                this.setSong(this.state.trackList[0].playUrl, 0)

            } else {
                // this.setState({
                //     selectedSong: this.state.trackList[this.state.songIndex + 1].playUrl,
                //     songIndex: this.state.songIndex + 1
                // })
                this.setSong(this.state.trackList[this.state.songIndex + 1].playUrl, (this.state.songIndex + 1))
            }

        } else {
            if (this.state.songIndex === (playListLength - 1)) {
                // this.setState({
                //     selectedSong: this.state.trackList[0].playUrl,
                //     songIndex: 0
                // })
                this.setPlayListSong(this.state.playList[0].songUrl, 0)

            } else {
                // this.setState({
                //     selectedSong: this.state.trackList[this.state.songIndex + 1].playUrl,
                //     songIndex: this.state.songIndex + 1
                // })
                this.setPlayListSong(this.state.playList[this.state.songIndex + 1].songUrl, (this.state.songIndex + 1))
            }
            

        }
        
    }

    prevSong() {
        console.log(this.state.songIndex)
        let trackListLength = Object.keys(this.state.trackList).length

        if (this.state.songIndex === 0) {
            this.setState({
                selectedSong: this.state.trackList[trackListLength - 1].playUrl,
                songIndex: trackListLength - 1,
                isPlayListSong: false
            })

        } else {
            this.setState({
                songIndex: this.state.songIndex - 1,
                selectedSong: this.state.trackList[this.state.songIndex - 1].playUrl,
                isPlayListSong: false
            }, () => {
                console.log(this.state.songIndex)
            })
        }
    }
    setPlayList(songIndex, playListSongIndex) {
        console.log(songIndex)
        let name = this.state.trackList[songIndex].title
            ? this.state.trackList[songIndex].title
            : this.state.trackList[songIndex].name
            ? this.state.trackList[songIndex].name
            : ''

        let newTrack = [{
            name: name,
            songUrl: this.state.trackList[songIndex].playUrl,
            id: songIndex

        }]
        let newTrackArray = [...this.state.playList, ...newTrack]


        this.setState({

            playList: this.uniq(newTrackArray, 'songUrl'),
            songIndex: playListSongIndex,
            isPlayListSong: true
        }, () => {
            console.log(this.state.playList)
            localStorage.setItem('playlist', JSON.stringify(this.state.playList))
            console.log(this.state.isPlayListSong)
        })
    }

    uniq(a, param) {
        return a.filter(function (item, pos, array) {
            return array.map(function (mapItem) {
                return mapItem[param]
            }).indexOf(item[param]) === pos
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
                            setPlayList={ this.setPlayList }
                            checkSong={ this.state.songIndex }
                            checkType={ this.state.isPlayListSong }
                        />
                }
                
                {
                    this.state && this.state.selectedSong &&
                        <Player
                            songToPlay={ this.state.selectedSong }
                            nextSong={ this.nextSong }
                            prevSong={ this.prevSong }
                        />
                }
                {
                    this.state && this.state.playList &&
                        <PlayList 
                            playList={ this.state.playList }
                            setPlayListSong={ this.setPlayListSong }
                            checkSong={ this.state.songIndex }
                            checkType={ this.state.isPlayListSong }
                        />
                }
                
                    
                    {/* <button onClick={() => this.props.showConcertScreen()}>back</button> */}
                    

                </div>
            </>
        );
    }
}

export default IndividualConcert

IndividualConcert.propTypes = {
    showConcertScreen: PropTypes.func.isRequired,
    concertToPlay: PropTypes.string.isRequired
}