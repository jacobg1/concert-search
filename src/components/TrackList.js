/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import PlayList from './PlayList'
import checkMark from '../images/check-solid.svg'
import plusSign from '../images/add.svg'
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

            return <div 
                      className={styles.trackHolder}    
                      key={i}
                    >
                    <div onClick={() => this.props.setSong(playUrl, i)}>
                        <span 
                            className={( !checkType && playUrl === selectedSong ) ? 'active' : '' }
                        >
                            {
                                title 
                                    ? title
                                    : name
                                    ? name
                                    : ''
                            }
                                {/* <span> track { i + 1 } of { trackListLength }</span> */}
                        </span>
                    </div>
                    <span
                        onClick={() => this.props.addToPlayList(i)}
                        className={ styles.addPlayList }
                    > 
                    {
                        !this.props.checkPlayList(playUrl)
                            ? <img className={ styles.plus } src={ plusSign } alt="add to playlist"></img>
                            : <img className={ styles.checkMark } src={ checkMark } alt="check-mark"></img>
                    }
                    </span>
                </div>   
        })
        
        return (
            <div className={ styles.trackList }>

                <h3>{ trackListLength } tracks</h3>

                <div className={ styles.maxHeightHolder }>
                    { showTrackList }
                </div>
                    
            </div>
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