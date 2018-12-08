/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'

class ConcertSearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            concertIndex: 0,
            nextResults: []
        }
        this.increaseConcertIndex = this.increaseConcertIndex.bind(this)
    }
   
    componentDidUpdate(prevProps) {
        // console.log(Object.keys(this.props.concerts).length, (this.state.concertIndex - 1))
        if (prevProps.concerts !== this.props.concerts) {
            const newResults = Object.keys(this.props.concerts[0]).map((item) => (
                <div className="individual-concert" key={this.props.concerts[0][item].id}>
                    <h3>{ this.props.concerts[0][item].id }</h3>
                    <span>{this.props.concerts[0][item].description}</span>
                </div>
            ))
            this.setState({
                nextResults: [...newResults],
                concertIndex: 0
            }, () => {
                console.log('test', this.state.newResults, this.state.concertIndex)
            })
        }
    }
    componentDidMount () {
       this.loadData()
    }
   
    loadData() {
        console.log('this', Object.keys(this.props.concerts).length)
        const initialResults = Object.keys(this.props.concerts[0]).map((item) => (
            <div className="individual-concert" key={this.props.concerts[0][item].id}>
                <h3>{this.props.concerts[0][item].id}</h3>
                <span>{this.props.concerts[0][item].description}</span>
            </div>
        ))
        this.setState({
            nextResults: [...this.state.nextResults, ...initialResults]
        }, () => {
            // console.log('test', this.state.nextResults)
        })
    }

    increaseConcertIndex () {
       
            this.setState({
                concertIndex: this.state.concertIndex + 1
            }, () => {

                const nextChunk = Object.keys(this.props.concerts[this.state.concertIndex]).map((item) => (
                    <div className="individual-concert" key={ this.props.concerts[this.state.concertIndex][item].id }>
                        <h3>{ this.props.concerts[this.state.concertIndex][item].id} </h3>
                        <span>{ this.props.concerts[this.state.concertIndex][item].description }</span>
                    </div>
                ))

                this.setState({
                    nextResults: [...this.state.nextResults, ...nextChunk]
                }, () => {
                    // console.log('test', this.state.nextResults, this.state.concertIndex)

                })
            })
     
        
        
    }

    render() {
    
        return (
            <> 
                { 
                    this.state && this.state.nextResults &&
                        this.state.nextResults
                } 
                {
                    (this.state.concertIndex + 1) !== Object.keys(this.props.concerts).length 

                        ? <p onClick={() => this.increaseConcertIndex()}>Load more</p>

                        : Object.keys(this.props.concerts).length === 1

                        ? ''

                        : <p>No more results</p> 
                }
            </>
        );
    }
}
export default ConcertSearchResults;

ConcertSearchResults.propTypes = {
    concerts: PropTypes.array
}