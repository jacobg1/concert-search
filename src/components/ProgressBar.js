/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/ProgressBar.module.scss'

class ProgressBar extends Component {
    constructor() {
        super()
        this.state = {
            totalTime: null
        }
        // this.setProgress = this.setProgress.bind(this)
        // this.findPosition = this.findPosition.bind(this)
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

    // click event to change song position when
    // progress bar is clicked
    findPosition (e) {
        
        // select progress bar and audio element
        let progressBar = document.getElementById('progressBar'),
            player = document.getElementById('musicPlayer')

        // calculate position of click on progress bar
        let offsetX = e.pageX - progressBar.offsetLeft,
            percentPosition = offsetX / progressBar.offsetWidth

        // set new position based on click
        player.currentTime = percentPosition * player.duration
        // console.log(percentPosition)

        // start the song back up
        this.props.playSong()
    }

    render() {
        return (
            <div className={ styles.progressBarHolder }>  
               
                <progress 
                    id='progressBar' 
                    max={1} 
                    value={this.progress}
                    onClick={(e) => this.findPosition(e)}
                >    
                </progress>

                <div>
                    {
                        this.currentTime
                            ? <span className={styles.currentTime}>{this.currentTime}</span>
                            : ''
                    }
                    {
                        this.totalTime
                            ? <span className={styles.totalTime}>{this.totalTime}</span>
                            : ''
                    }
                </div>

            </div>
        );
    }
}

export default ProgressBar

ProgressBar.propTypes = {
    playSong: PropTypes.func
}