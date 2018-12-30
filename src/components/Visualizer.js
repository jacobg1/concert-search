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
    componentDidMount () {
        // this.createVisualizer()
        // console.log(this.props.audioData)
       
        
    }
    componentDidUpdate() {
        this.createVisualizer()
    }
    
    createVisualizer () {
     
        let { audioData } = this.props,
            { isVisClose } = this.props

        let canvas = document.getElementById('canvas')
        
        // var svgHeight = canvas.clientHeight;
        // var svgWidth = canvas.clientWidth;
        // var barPadding = '1';
        const dataMax = max(audioData)
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, 300])
           
        // console.log(transition)
        // const randomColor = scaleLinear()
        //     .category20()

        // console.log(randomColor(13))
        // console.log(this.props.isVisClose)
        if(!isVisClose) {
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
                .attr("fill", function (d) {
                    return "hsl(" + Math.random() * (d * 2) + ",100%,50%)"
                })
                .attr('x', (d, i) => i * 10)

                .attr('y', d => 300 - yScale(d))
                .attr('height', d => yScale(d) * 2)
                .attr('width', 7)
        }
        

        // select(canvas)
        //     .selectAll('rect')
        //     .data(audioData)
        //     .attr('x', (d, i) => i * (svgWidth / audioData.length))
        //     .attr('y', function (d) {
        //         return  d;
        //     })
        //     .attr('height', function (d) {
        //         return d
        //     })
        //     .attr('fill', function (d) {
        //         return 'rgb(0, 0, ' + d + ')';
        //     })
        //     .attr('width', (svgWidth / audioData.length) - .2)    
       
           
       
    //    svg.selectAll('rect')
    //        .data([4,10,20])
    //        .enter()
    //        .append('rect')
    //        .attr('width', 300 / this.props.audioData.length - 5)
    //        .attr('x', function (d, i) {
    //            return i * (300 / this.props.audioData.length);
    //        })
            
        
       
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
    isVisClose: PropTypes.bool
}