/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class TrackList extends Component {
    // constructor(props) {
    //     super(props)
    // }

    componentDidMount () {
        console.log(this.props.trackList)
    }

    render() {
        const showTrackList = Object.keys(this.props.trackList).map((song, i) => {
            return <div key={i}>
                      <p>
                        <span 
                            onClick={() => this.props.setSong(this.props.trackList[song].playUrl)}
                        >play</span>

                          {this.props.trackList[song].title}
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