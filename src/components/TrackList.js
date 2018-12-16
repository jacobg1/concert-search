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
                                onClick={() => this.props.addToPlayList(i)}
                            > +</span>
                      </p>
                   </div>
        })
        
        return (
            <>
            <h1>tracklist:</h1>
                { showTrackList }
            </>
        );
    }
}

export default TrackList;

TrackList.propTypes = {
    trackList: PropTypes.array.isRequired,
    setSong: PropTypes.func.isRequired,
    addToPlayList: PropTypes.func.isRequired,
    checkSong: PropTypes.number,
    checkType: PropTypes.bool
}