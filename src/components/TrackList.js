/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import PlayList from './PlayList'
import checkMark from '../images/check-solid.svg'
import styles from './styles/TrackList.module.scss'

class TrackList extends Component {
    
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
                      <span 
                        className={( !checkType && playUrl === selectedSong ) ? 'active' : '' }
                        onClick={() => this.props.setSong(playUrl, i)}
                      >
                          {
                              title 
                                ? title
                                : name
                                ? name
                                : ''
                          }
                            <span> track { i + 1 } of { trackListLength }</span>
                      </span>

                      <span
                        onClick={() => this.props.addToPlayList(i)}
                      > 
                      {
                          !this.props.checkPlayList(playUrl)
                            ? '+'
                            : <img className={styles.checkMark} src={checkMark}></img>
        }
        
                      </span>

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
    playList: PropTypes.array,
    setSong: PropTypes.func.isRequired,
    addToPlayList: PropTypes.func.isRequired,
    checkType: PropTypes.bool,
    selectedSong: PropTypes.string,
    checkPlayList: PropTypes.func
}