import React, { Component } from 'react';
import PropTypes from 'prop-types'

class IndividualConcert extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <>
                <h1 onClick={() => this.props.showConcertScreen()}>test</h1>
            </>
        );
    }
}

export default IndividualConcert;

IndividualConcert.propTypes = {
    showConcertScreen: PropTypes.func.isRequired
}