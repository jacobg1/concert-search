/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/Player.module.scss'
import Visualizer from './Visualizer'
import ProgressBar from './ProgressBar'
import play from '../images/play-play.svg'
import pause from '../images/pause-solid.svg'
import forward from '../images/forward-solid.svg'
import back from '../images/backward-solid.svg'

class Player extends Component {
    constructor(props) {
        super(props)
        // initiate state with an empty uint 8 array
        // and bind this to the next function
        this.state = { 
            // eslint-disable-next-line no-undef
            audioData: new Uint8Array(0),
            isPlaying: true
        }
        this.next = this.next.bind(this)
        this.playSong = this.playSong.bind(this)
    }
    componentDidMount () {
        
        // create new audio content to interact with the browsers audio api
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()

        // select audio element and set cross origin to anonymous
        // this bypasses cors issues
        this.audioElement = document.getElementById('musicPlayer')
        this.audioElement.crossOrigin = 'anonymous'

        // connect playing song to audio context
        // and create an instance of the audio api's analyzer
        this.audioSource = this.audioContext.createMediaElementSource(this.audioElement)
        this.analyser = this.audioContext.createAnalyser()

        // copy frequency data received from audio analyser to data array
        // this will get saved as state in the next() function
        // eslint-disable-next-line no-undef
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)

        // connect audio source to analyser        
        this.audioSource.connect(this.analyser)
        this.audioSource.connect(this.audioContext.destination)

        // play song and start visualizer animation
        this.playSong()
    }
    componentDidUpdate (prevProps) {
        if(prevProps.songToPlay !== this.props.songToPlay) {
            this.playSong()
        }
    }

    // starts loop that streams frequency data to state audioData array
    next() {
        this.analyser.getByteTimeDomainData(this.dataArray)
        this.setState({ audioData: this.dataArray }, () => {
            // console.log(this.state.audioData)
        });
        this.animationId = requestAnimationFrame(this.next)
        
    }
    componentWillUnmount() {
        cancelAnimationFrame(this.animationId)
        this.analyser.disconnect()
        this.audioSource.disconnect()
    }
    pauseSong () {
        cancelAnimationFrame(this.animationId)
        // let player = document.getElementById('musicPlayer')
        this.audioElement.pause()

        this.setState({ isPlaying: false }, () => {
            console.log(this.state.isPlaying)
        })

       
    }
    playSong () {
        // let player = document.getElementById('musicPlayer')
        
        this.audioElement.play()
        this.animationId = requestAnimationFrame(this.next)

        this.setState({ isPlaying: true }, () => {
            console.log(this.state.isPlaying)

        })
    }
    playToggle () {
        if (!this.state.isPlaying) {
            this.playSong()
        } else {
            this.pauseSong()
        }
    }
   
    render() {

        let { playListSongIndex } = this.props,
            { songToPlay } = this.props

        return (
            <>
              <div className={ styles.visHolder }>
                    {
                        this.state && this.state.audioData &&
                        <Visualizer audioData={this.state.audioData} />
                    }
                <div className={ styles.player }>
                    
                    <div 
                        onClick={() => this.playToggle()}
                    >   
                    {
                        !this.state.isPlaying
                            ? <img alt='play' className={ styles.play } src={ play }></img>
                            : <img alt='pause' className={ styles.pause } src={ pause }></img>
                    }
                    </div>

                    <div className={ styles.forwardBackHolder }>
                        <img
                            src={ back }
                            alt='back'
                            className={ styles.fastRewind }
                            onClick={() => this.props.prevSong(playListSongIndex)}
                        >
                        </img>
                        
                        <img 
                            src={ forward }
                            alt='forward'
                            className={ styles.fastForward }
                            onClick={() => this.props.nextSong(playListSongIndex)}
                        >
                        </img>
                    </div>

                    <audio 
                        id='musicPlayer'
                        type='audio/mp3'
                    
                        src={ songToPlay } 
                        onEnded={() => this.props.nextSong(playListSongIndex)}
                    />
                    <ProgressBar playSong={ this.playSong } />
                </div>
            </div>
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