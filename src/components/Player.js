/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class Player extends Component {

    
    componentDidUpdate () {
        console.log(this.props.songToPlay)

    }
    render() {
        return (
            <>
                <audio 
                    type='audio/mp3'
                    controls 
                    autoPlay 
                    src={ this.props.songToPlay } 
                />
            </>
        );
    }
}

export default Player;

Player.propTypes = {
    songToPlay: PropTypes.string
}