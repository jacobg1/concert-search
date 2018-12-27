/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/Player.module.scss'

class Player extends Component {

    render() {
        let { playListSongIndex } = this.props,
            { songToPlay } = this.props
        return (
            <div className={ styles.player }>
                <button onClick={() => this.props.prevSong(playListSongIndex)}>prev</button>
                <button onClick={() => this.props.nextSong(playListSongIndex)}>next</button>
                <audio 
                    type='audio/mp3'
                    controls 
                    controlsList='nodownload'
                    autoPlay 
                    src={ songToPlay } 
                    onEnded={() => this.props.nextSong(playListSongIndex)}
                />
            </div>
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