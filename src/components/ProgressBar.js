/* eslint-disable no-console */
import React, { Component } from 'react';
// import PropTypes from 'prop-types'

class ProgressBar extends Component {
    constructor() {
        super()
        this.state = {
            totalTime: null
        }
        // this.setProgress = this.setProgress.bind(this)
    }
    componentDidMount () {
        
        // start progress bar out at zero
        this.progress = 0

    }

    // when component updates start loop that sets
    // current time and total time
    componentDidUpdate () {
        this.setProgress()
    }

    // function to set current time, total time
    // and progress bar
    setProgress() {

        // select player element, from player element
        // get current song time and length of song
        let player = document.getElementById('musicPlayer'),
            songLength = player.duration,
            currentSongTime = player.currentTime

        // console.log(songLength, currentSongTime)

        // only set progress and total time if 
        // songLength is not NaN
        if (!isNaN(songLength)) {
            this.totalTime = this.calculateTotalTime(songLength)
            this.progress = currentSongTime / songLength
        }

        // set current time
        this.currentTime = this.calculateSongPosition(currentSongTime)
        
    }

    // takes in total song length and returns
    // length in format: minutes:seconds
    calculateTotalTime(songLength) {

        let minutes = Math.floor(songLength / 60),
            seconds = songLength - minutes * 60,
            secondsToStr = seconds.toString(),
            totalSeconds = secondsToStr.substr(0, 2)

        let totalTime = minutes + ':' + totalSeconds

        return totalTime
    }

    // find current time in song
    calculateSongPosition(current) {
        let minute = parseInt(current / 60) % 60,
            secondsBig = current % 60,
            seconds = secondsBig.toFixed()

        let currentTime = (minute < 10 ? '0' + minute : minute) 
                        + ':' 
                        + (seconds < 10 ? '0' + seconds : seconds)

        return currentTime
    }

    render() {
        return (
            <>  
                {
                    this.totalTime
                        ? <span>{this.totalTime}</span>
                        : ''
                }

                <progress id='progressBar' max={1} value={this.progress}></progress>

                {
                    this.currentTime
                        ? <span>{this.currentTime}</span>
                        : ''
                }
            </>
        );
    }
}

export default ProgressBar

// ProgressBar.propTypes = {
//     player: PropTypes.element
// }