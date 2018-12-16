/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Player extends Component {

    render() {
        let { playListSongIndex } = this.props,
            { songToPlay } = this.props
        return (
            <>
                <button onClick={() => this.props.prevSong(playListSongIndex)}>prev</button>
                <audio 
                    type='audio/mp3'
                    controls 
                    autoPlay 
                    src={ songToPlay } 
                    onEnded={() => this.props.nextSong(playListSongIndex)}
                />
                <button onClick={() => this.props.nextSong(playListSongIndex)}>next</button>
            </>
        );
    }
}

export default Player;

Player.propTypes = {
    songToPlay: PropTypes.string,
    nextSong: PropTypes.func.isRequired,
    prevSong: PropTypes.func.isRequired,
    playListSongIndex: PropTypes.number
}