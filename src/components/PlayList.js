import React, { Component } from 'react';
import PropTypes from 'prop-types'

class PlayList extends Component {
    // constructor(props) {
    //     super(props)
    // }
    render() {
        let { checkType } = this.props,
            { checkSong } = this.props,
            { playList } = this.props
            
        let showPlayList = Object.keys(playList).map((song, i) => {
            return <div key={i}>
                      <p 
                        className={( checkType && i === checkSong ) ? 'active' : '' }
                        onClick={() => this.props.setPlayListSong( playList[song].songUrl, i )}
                      >
                        { playList[song].name }
                      </p>
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
    checkSong: PropTypes.number,
    checkType: PropTypes.bool
    
}