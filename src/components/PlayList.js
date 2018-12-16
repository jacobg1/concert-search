/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class PlayList extends Component {
    
    render() {
        let { checkType } = this.props,
            { playList } = this.props,
            { selectedSong } = this.props
            
        let showPlayList = Object.keys(playList).map((song, i) => {

            let { songUrl } = playList[song],
                { name } = playList[song],
                { id } = playList[song]

            return <div key={i}>
                      <span 
                        className={(checkType && songUrl === selectedSong ) ? 'active' : '' }
                        onClick={() => this.props.setPlayListSong( songUrl, id )}
                      >
                        { name }
                      </span>
                      <span 
                        onClick={() => this.props.removeFromPlayList(i)}
                        className={(checkType && songUrl === selectedSong ? 'delete-active' : '')}
                      > -</span>
                  </div>
        })
        return (
            <>
            <h1>playlist: </h1>
              { showPlayList }
            </>
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