/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/PlayList.module.scss'
import remove from '../images/clear.svg'

class PlayList extends Component {

    componentDidUpdate(prevProps) {
        if (!prevProps.selectedSong && this.props.selectedSong) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }
    
    render() {
        let { checkType } = this.props,
            { playList } = this.props,
            { selectedSong } = this.props,
            playListLength  = Object.keys(playList).length
            
        let showPlayList = Object.keys(playList).map((song, i) => {

            let { songUrl } = playList[song],
                { name } = playList[song],
                { id } = playList[song]

            return <div 
                      key={i}
                      className={ 
                          `${styles.playHolder}
                                ${(checkType && songUrl === selectedSong) ? styles.playActive : ''}` 
                      }
                   >
                   <div className={ styles.playListPadding } onClick={() => this.props.setPlayListSong( songUrl, id )}>
                      <span 
                        className={(checkType && songUrl === selectedSong ) ? 'active' : '' }
                        
                      >
                        { name }
                      </span>
                    </div>  
                      <img 
                        src={remove}
                        alt='remove'
                        onClick={() => this.props.removeFromPlayList(i)}
                        className={(checkType && songUrl === selectedSong ? 'delete-active' : `${styles.remove}`)}
                      ></img>
                  </div>
        })
        return (
            <div className={ styles.playList }>
            
              <h3>{ playListLength } songs</h3>

              <div className={ styles.maxHeightHolder }>
                    {showPlayList}
              </div>
              
            </div>
        );
    }
}

export default PlayList

PlayList.propTypes = {
    playList: PropTypes.array.isRequired,
    setPlayListSong: PropTypes.func.isRequired,
    checkType: PropTypes.bool,
    removeFromPlayList: PropTypes.func.isRequired,
    selectedSong: PropTypes.string
    
}