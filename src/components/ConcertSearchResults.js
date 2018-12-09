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
        // binding this on click function
        this.increaseConcertIndex = this.increaseConcertIndex.bind(this)
    }
   
    componentDidUpdate(prevProps) {
        // console.log(Object.keys(this.props.concerts).length, (this.state.concertIndex - 1))

        // check if props have changed, if they have, show new results
        if (prevProps.concerts !== this.props.concerts) {
            // const newResults = Object.keys(this.props.concerts[0]).map((item) => (
            //     <div className="individual-concert" key={this.props.concerts[0][item].id}>
            //         {/* <h3>{ this.props.concerts[0][item].id }</h3> */}
            //         <p>{this.props.concerts[0][item].title}</p>
            //     </div>
            // ))
            let newResults = this.returnDataStructure() 

            // set state with new results
            this.setState({
                nextResults: [...newResults],
                concertIndex: 0
            }, () => {
                // console.log('test', this.state.newResults, this.state.concertIndex)
            })
        }
    }

    componentDidMount () {

       // load initial data 
       this.loadData()
    //    console.log(this.props.concerts)
    }

    returnDataStructure () {

        // helper to load initial data
        const structuredData = Object.keys(this.props.concerts[0]).map((item) => (
            <div 
                className="individual-concert" 
                onClick={() => this.props.showConcertScreen(this.props.concerts[0][item].identifier)} 
                key={this.props.concerts[0][item].id}
            >
                <h3>{this.props.concerts[0][item].identifier}</h3>
                <p>{this.props.concerts[0][item].title}</p>
            </div>
        ))
        // console.log(this.props.concerts)
        return structuredData
    }
   
    loadData() {
        // console.log('this', Object.keys(this.props.concerts).length)
        // const initialResults = Object.keys(this.props.concerts[0]).map((item) => (
        //     <div className="individual-concert" onClick={() => this.props.showConcertScreen()} key={ this.props.concerts[0][item].id }>
        //         {/* <h3>{this.props.concerts[0][item].id}</h3> */}
        //         <p>{ this.props.concerts[0][item].title }</p>
        //     </div>
        // ))
        let initialResults = this.returnDataStructure()

        // merge in new results
        this.setState({
            nextResults: [...this.state.nextResults, ...initialResults]
        }, () => {
            // console.log('test', this.state.nextResults)
        })
    }

    increaseConcertIndex () {

            // increase counter and then display the next chunk
            this.setState({
                concertIndex: this.state.concertIndex + 1
            }, () => {

                const nextChunk = Object.keys(this.props.concerts[this.state.concertIndex]).map((item) => (
                    <div 
                        className="individual-concert" 
                        key={ this.props.concerts[this.state.concertIndex][item].id }
                        onClick={() => this.props.showConcertScreen(this.props.concerts[this.state.concertIndex][item].identifier)} 
                    >
                        
                        <h3>{ this.props.concerts[this.state.concertIndex][item].id } </h3>
                        <h3>{ this.props.concerts[this.state.concertIndex][item].identifier } </h3>
                        <p>{ this.props.concerts[this.state.concertIndex][item].title }</p>
                    </div>
                ))

                // merge in next chunk to state array
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

                        ? <button onClick={() => this.increaseConcertIndex()}>Load more</button>

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
    concerts: PropTypes.array.isRequired,
    showConcertScreen: PropTypes.func.isRequired
}