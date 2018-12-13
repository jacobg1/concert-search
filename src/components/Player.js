/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Player extends Component {

    
    // componentDidUpdate(prevProps) {
    //     // console.log(this.props.songToPlay)
    //     // if(prevProps.songToPlay !== this.props.songToPlay) {
    //     //     this.setState({ })
    //     // }

    // }
    render() {
        return (
            <>
                
                <button onClick={() => this.props.prevSong()}>prev</button>
                <audio 
                    type='audio/mp3'
                    controls 
                    autoPlay 
                    src={ this.props.songToPlay } 
                    onEnded={() => this.props.nextSong()}
                />
                <button onClick={() => this.props.nextSong()}>next</button>
            </>
        );
    }
}

export default Player;

Player.propTypes = {
    songToPlay: PropTypes.string,
    nextSong: PropTypes.func.isRequired,
    prevSong: PropTypes.func.isRequired
}