/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
// import PlayList from './PlayList'
import checkMark from '../images/check-solid.svg'
import plusSign from '../images/add.svg'
import styles from './styles/TrackList.module.scss'
import ReactSVG from 'react-svg'

class TrackList extends Component {
   
    componentDidUpdate (prevProps) {
        if(!prevProps.selectedSong && this.props.selectedSong) {
            window.scrollTo(0, document.body.scrollHeight);
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

            let active = (!checkType && playUrl === selectedSong)

            return <div 
                      className={
                          `${styles.trackHolder}
                           ${active ? styles.trackActive : ''}`
                      }    
                      key={i}
                   >
                    <div className={ styles.trackPadding } onClick={() => this.props.setSong(playUrl, i)}>
                        <span>
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
                    <div
                        onClick={() => this.props.addToPlayList(i)}
                        className={ styles.addPlayList }
                    > 
                    {
                        !this.props.checkPlayList(playUrl)
                            ? <ReactSVG className={ styles.plus } src={ plusSign } />
                            : <ReactSVG className={ styles.checkMark } src={ checkMark } />
                    }
                    </div>
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