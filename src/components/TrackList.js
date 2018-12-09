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
                      <p>{this.props.trackList[song].title}</p>
                   </div>
        })
        return (
            <>
                <h1>Track list goes here</h1>
                { showTrackList }
            </>
        );
    }
}

export default TrackList;

TrackList.propTypes = {
    trackList: PropTypes.array.isRequired
}