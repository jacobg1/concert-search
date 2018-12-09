/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TrackList extends Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount () {
        console.log(this.props.trackList[0])
    }

    render() {

        let trackListLength = Object.keys(this.props.trackList).length

        const showTrackList = Object.keys(this.props.trackList).map((song, i) => {
            return <div key={i}>
                      <p>
                        <span 
                            onClick={() => this.props.setSong( this.props.trackList[song].playUrl, i )}
                        >play </span>

                          {
                              this.props.trackList[song].title 
                                ? this.props.trackList[song].title
                                : this.props.trackList[song].name
                                ? this.props.trackList[song].name
                                : ''
                          }
                            <span> track { i + 1 } of { trackListLength }</span>
                      </p>
                      
                   </div>
        })
        return (
            <>
                { showTrackList }
            </>
        );
    }
}

export default TrackList;

TrackList.propTypes = {
    trackList: PropTypes.array.isRequired,
    setSong: PropTypes.func.isRequired
}