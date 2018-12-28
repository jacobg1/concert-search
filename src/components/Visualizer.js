/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { select } from 'd3-selection'
import styles from './styles/Visualizer.module.scss'

class Visualizer extends Component {
    constructor(props) {
        super(props)
        this.createVisualizer = this.createVisualizer.bind(this)
    }
    componentDidMount () {
        this.createVisualizer()
        console.log(this.props.audioData)
    }
    componentDidUpdate() {
        this.createVisualizer()
    }
    createVisualizer () {
     
        let { audioData } = this.props
        let canvas = document.getElementById('canvas')
        
        var svgHeight = canvas.clientHeight;
        var svgWidth = canvas.clientWidth;
        var barPadding = '1';
        console.log(svgWidth, svgHeight)

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
            .attr('x', (d, i) => i * (svgWidth / 1024))
            .attr('y', function (d) {
                return  d;
            })
            .attr('height', function (d) {
                return d
            })
            .attr('fill', function (d) {
                return 'rgb(0, 0, ' + d + ')';
            })
            .attr('width', .2)    
       
           
       
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
               <div className={styles.svgHolder}>
                    <svg id='canvas'></svg>
               </div>
            </>
        );
    }
}

export default Visualizer;

Visualizer.propTypes = {
    audioData: PropTypes.object
}