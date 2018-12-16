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
            { trackList } = this.props,
            { selectedSong } = this.props

        let showTrackList = Object.keys(this.props.trackList).map((song, i) => {

            let { title } = trackList[song],
                { name } = trackList[song],
                { playUrl } = trackList[song]

            return <div key={i}>
                      <p className={( !checkType && playUrl === selectedSong ) ? 'active' : '' }>
                        <span 
                            onClick={() => this.props.setSong( playUrl, i )}
                        >play </span>

                          {
                              title 
                                ? title
                                : name
                                ? name
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
    checkType: PropTypes.bool,
    selectedSong: PropTypes.string
}