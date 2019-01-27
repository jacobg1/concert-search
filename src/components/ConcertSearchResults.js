/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import styles from './styles/ConcertSearchResults.module.scss'

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

        // check if props have changed, if they have, show new results
        if (prevProps.concerts !== this.props.concerts) {
    
            let newResults = this.returnDataStructure(0) 

            // set state with new results
            this.setState({
                nextResults: [...newResults],
                concertIndex: 0
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
                     className={ styles.concert }
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
        return structuredData
    }
   
    loadData() {

      let initialResults = this.returnDataStructure(0)

      // merge in new results
      this.setState({
        nextResults: [...this.state.nextResults, ...initialResults]
      })
    }

    increaseConcertIndex () {

      // increase counter and then display the next chunk
      this.setState({
        concertIndex: this.state.concertIndex + 1
      }, () => {
	
        let nextChunk = this.returnDataStructure(this.state.concertIndex)

        // merge in next chunk to state array
        this.setState({
          nextResults: [...this.state.nextResults, ...nextChunk]
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
                <div className={ styles.loadMoreHolder }>
                    {
                        (this.state.concertIndex + 1) !== Object.keys(this.props.concerts).length 

                            ? <button 
                                className={ `${styles.loadMore} ${styles.cursor}` }
                                onClick={() => this.increaseConcertIndex()}
                            >
                                Load more
                            </button>

                            : Object.keys(this.props.concerts).length === 1
                            ? ''
                            : <button className={styles.loadMore}>No more results</button> 
                    }
                </div>
            </>
        )
    }
}
export default ConcertSearchResults

ConcertSearchResults.propTypes = {
    concerts: PropTypes.array.isRequired,
    showConcertScreen: PropTypes.func.isRequired
}