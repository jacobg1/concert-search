/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/PlayList.module.scss'
import remove from '../images/clear.svg'
import ReactSVG from 'react-svg'

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

            let active = (checkType && songUrl === selectedSong)

            return <div 
                      key={i}
                      className={ 
                        `${styles.playHolder}
                         ${active ? styles.playActive : ''}` 
                      }
                   >
                   <div className={ styles.playListPadding } onClick={() => this.props.setPlayListSong( songUrl, id )}>
                      <span>
                        { name }
                      </span>
                    </div>  
                      <div 
                        onClick={() => this.props.removeFromPlayList(i)}
                        className={(active ? 'delete-active' : `${styles.remove}`)}
                      >
                        <ReactSVG className={ styles.remove } src={ remove } />
                      </div>
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