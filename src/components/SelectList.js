/* eslint-disable no-console */
import React, { Component } from 'react';
import artistYearList from '../data/artistYearList';

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
  
        console.log(artistYearList)
       
    }
    getYears(e) {
        // console.log(artistYearList[e.target.value])

        this.setState({
            yearOptions: artistYearList[e.target.value] || [' '],
            artist: ''
        }, function () {
            this.setState({ artist: e.target.value })
        }, function () {
            console.log(this.state.artist)

        })
    }
    setYear(e) {
        this.setState({ 
            year: e.target.value !== ' ' ? e.target.value : ''
        }, function () {
            console.log(this.state.year, this.state.artist)
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
        if(this.state.yearOptions !== [' ']) {
            yearList.unshift(
                <option key='0' value=''>Select year(optional)</option>
            )
        }
        let yearSelect = 
            <select value={this.state.year} onChange={(e) => this.setYear(e)}>
                {yearList}
            </select>
        return (
            <>
                <select onChange={(e) => this.getYears(e)}>
                    { artistChoices }
                </select>
                { this.state.artist !== '' ? yearSelect : '' }
            </>
        );
    }
}
export default SelectList;