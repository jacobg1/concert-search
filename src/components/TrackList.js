/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import PlayList from './PlayList'

class TrackList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            playList: null,
        }
    }

    componentDidMount () {
        console.log(this.props.trackList[0])
    }
   
    // addToPlayList(songIndex) {
    //     console.log(songIndex)
    //     let name = this.props.trackList[songIndex].title 
    //         ? this.props.trackList[songIndex].title 
    //         : this.props.trackList[songIndex].name 
    //         ? this.props.trackList[songIndex].name 
    //         : ''

    //     let newTrack = [{
    //         name: name,
    //         songUrl: this.props.trackList[songIndex].playUrl,
    //         id: songIndex

    //     }]
    //     let newTrackArray = [...this.state.playList, ...newTrack]

    
    //     this.setState({
            
    //         playList: this.uniq(newTrackArray, 'songUrl')
    //     }, () => {
    //         console.log(this.state.playList)
    //     })
    //    this.props.setPlayList()
    // }

    // uniq(a, param) {
    //     return a.filter(function (item, pos, array) {
    //         return array.map(function (mapItem) {
    //             return mapItem[param]
    //         }).indexOf(item[param]) === pos
    //     })
    // }   

    render() {

        let trackListLength = Object.keys(this.props.trackList).length,
            { checkType } = this.props,
            { checkSong } = this.props,
            { trackList } = this.props

        const showTrackList = Object.keys(this.props.trackList).map((song, i) => {
            return <div key={i}>
                      <p className={( !checkType && i === checkSong ) ? 'active' : '' }>
                        <span 
                            onClick={() => this.props.setSong( trackList[song].playUrl, i )}
                        >play </span>

                          {
                              trackList[song].title 
                                ? trackList[song].title
                                : trackList[song].name
                                ? trackList[song].name
                                : ''
                          }
                            <span> track { i + 1 } of { trackListLength }</span>
                            <span
                                onClick={() => this.props.setPlayList(i)}
                            > add to play list</span>
                      </p>
                   </div>
        })
        
        return (
            <>
            <h1>tracklist:</h1>
                { showTrackList }
                {/* {
                    this.state && this.state.playList && 
                        <PlayList playLisst={ this.state.playList }/>
                } */}
            </>
        );
    }
}

export default TrackList;

TrackList.propTypes = {
    trackList: PropTypes.array.isRequired,
    setSong: PropTypes.func.isRequired,
    setPlayList: PropTypes.func.isRequired,
    checkSong: PropTypes.number,
    checkType: PropTypes.bool
}