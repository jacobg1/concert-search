/* eslint-disable no-console */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import artistYearList from '../data/artistYearList'
import styles from './styles/SelectList.module.scss'

class SelectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dropDownOptions: Object.entries(artistYearList),
            yearOptions: [' '],
            artist: '',
            year: ' '
        };
    }

    componentDidMount() {
  
        // console.log(artistYearList)
       
    }
    getYears(e) {
        // console.log(artistYearList[e.target.value])

        this.setState({
            artist: e.target.value,
            yearOptions: [' '],
            year: ''
        }, function () {
            // console.log(this.state.year, this.state.artist)
            let years = artistYearList[this.state.artist] || [' ']
            this.setState({
                yearOptions: years
            })
        })
    }
    setYear(e) {
        this.setState({ year: e.target.value}, function () {
            // console.log(this.state.year, this.state.artist)
        })
    }
    render() {

        let artistChoices = this.state.dropDownOptions.map((artist, index) => {
            return (
              <option key={ index + 1 } value={ artist[0] }>{ artist[0] }</option>
            )
        })

        artistChoices.unshift(
            <option key='0' value=''>Please Select a band</option>
        )

        let yearList = this.state.yearOptions.map((year, index) => {
            return (
                <option key={ index + 1 } value={ year }>{ year }</option>
            )
        })
     
        yearList.unshift(
            <option key='0' value=''>Select year(optional)</option>
        )
        
        return (
            <div className={ styles.selectHolder }>
                <div className={ styles.choices }>
                    {
                        this.state && this.state.artist &&
                            <span>{ this.state.artist }</span>
                    }
                    {
                        this.state && this.state.year && this.state.year !== ' ' &&
                            <span>, { this.state.year }</span>
                    }
                </div>

                <form 
                    id={ styles.dropDown } 
                    onSubmit={
                        (e) => this.props.makeSearch(e, this.state.artist, this.state.year)
                    }>

                    <select onChange={(e) => this.getYears(e)}>
                        { artistChoices }
                    </select>

                    <select value={ this.state.year } onChange={(e) => this.setYear(e)}>
                        { yearList }
                    </select>

                    <button type="submit">Search</button>

                </form>
            </div>
        );
    }
}
export default SelectList

SelectList.propTypes = {
    makeSearch: PropTypes.func.isRequired
}