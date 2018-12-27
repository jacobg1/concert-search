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

        // check if props have changed, if they have, show new results
        if (prevProps.concerts !== this.props.concerts) {
    
            let newResults = this.returnDataStructure(0) 

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
    }

    returnDataStructure (index) {

        let { concerts } = this.props

        // helper to load initial data
        let structuredData = Object.keys(concerts[index]).map((item) => {

            let { identifier } = concerts[index][item],
                { id } = concerts[index][item],
                { title } = concerts[index][item]

            return <div
                     onClick={() => this.props.showConcertScreen(identifier)} 
                     key={id}
                   >
                    <p>
                        {
                            title 
                            ? title 
                            : identifier    
                        }
                    </p>
            </div>
        })
        // console.log(structuredData)
        return structuredData
    }
   
    loadData() {

        let initialResults = this.returnDataStructure(0)

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

                // let { concerts } = this.props,
                //     { concertIndex } = this.state

                // const nextChunk = Object.keys(concerts[concertIndex]).map((item) => {
                //     return <div 
                //         className="individual-concert" 
                //         key={ concerts[concertIndex][item].id }
                //         onClick={() => this.props.showConcertScreen(concerts[concertIndex][item].identifier)} 
                //     >
                //         <p>
                //             { 
                //               concerts[concertIndex][item].title 
                //                 ? concerts[concertIndex][item].title 
                //                 : concerts[concertIndex][item].identifier
                //             }
                //         </p>
                //     </div>
                // })
                let nextChunk = this.returnDataStructure(this.state.concertIndex)
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