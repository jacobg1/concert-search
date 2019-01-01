/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
// eslint-disable-next-line no-unused-vars
import { transition } from 'd3-transition'
// import { interpolateLab } from 'd3-interpolate'

import styles from './styles/Visualizer.module.scss'

class Visualizer extends Component {
    constructor(props) {
        super(props)
        this.createVisualizer = this.createVisualizer.bind(this)
    }
    // componentDidMount () {
    //     // this.createVisualizer()
    //     // console.log(this.props.audioData)
       
        
    // }
    componentDidUpdate() {
        this.createVisualizer()
    }
    
    createVisualizer () {
     
        let { audioData } = this.props,
            { isVisClose } = this.props,
            { isPlaying } = this.props

        let canvas = document.getElementById('canvas')
        
        let dataMax = max(audioData)
        let yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, 300])
           
        if(!isVisClose && isPlaying) {
            select(canvas)
                .selectAll('rect')
                .data(audioData)
                .enter()
                .append('rect')

            select(canvas)
                .selectAll('rect')
                .data(audioData)
                .exit()
                .remove()

            select(canvas)
                .selectAll('rect')
                .data(audioData)
                .transition()
                .delay(300)
                .attr("fill", function (d, i) {
                    // let x = (i + 1) % 360
                    return "hsl(" + (i + 170)  + ",100%,50%)"
                })
                .attr('x', (d, i) => i * 10)
                .attr('y', d => 300 - yScale(d))
                .attr('height', d => yScale(d) * 2)
                .attr('width', 7)
                // .remove()
        }   
    }

    render() {
       
        return (
            <>
               <div className={
                   `${styles.svgHolder}
                        ${this.props.isVisClose ? styles.hide : ''}`
                }>
                    <svg id='canvas'></svg>
               </div>
            </>
        );
    }
}

export default Visualizer;

Visualizer.propTypes = {
    audioData: PropTypes.object,
    closeVisualizer: PropTypes.func,
    isVisClose: PropTypes.bool,
    isPlaying: PropTypes.bool
}