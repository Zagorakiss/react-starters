import * as React from 'react';
// import PropTypes from 'prop-types';
import {translate} from 'react-i18next';
import i18n from 'config/i18n';
// import * as d3 from 'd3';
import flareJson from 'constants/projects/flare.json';
import * as d3 from '../../../vendor/d3-layout-orbit';

class OrbitsD3 extends React.PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            // foo: 0
        }
    }

    makeViz() {
        d3.json(flareJson, (data) => {
            this.drawOrbit(data)
        });
    }

    drawOrbit(_data) {
        const windowWidth = window.innerWidth;
        const windowHight = window.innerHeight;
        // down with category20a()!!
        // d3.scale.category10 ↦ d3.schemeCategory10
        // d3.scale.category20 ↦ d3.schemeCategory20
        // d3.scale.category20b ↦ d3.schemeCategory20b
        // d3.scale.category20c ↦ d3.schemeCategory20c
        const colors = d3.schemeCategory20b;
        // console.log(colors);

        const orbitScale = d3.scaleLinear().domain([1, 3])
        // .range([3.8, 1.5])
        .range([4.8, 1.5])
        .clamp(true);
        const radiusScale = d3.scaleLinear().domain([0, 1, 2, 3])
        // .range([20, 10, 3, 1])
        .range([20, 10, 3, 1])
        .clamp(true);

        const orbit = d3.orbit()
        .mode('atomic')
        .size([windowWidth/2, windowHight/2])
        .children(function(d) {return d.children})
        .revolution(function(d) {return d.depth})
        .orbitSize(function(d) {return orbitScale(d.depth-1)})
        .speed(0.1)
        .nodes(_data);

        d3.select("svg").selectAll("g.node")
        .data(orbit.nodes())
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function(d) {return "translate(" +d.x +"," + d.y+")"})
        .on("mouseover", nodeOver)
        .on("mouseout", nodeOut)

        d3.selectAll("g.node")
        .append("circle")
        .attr("r", function(d) {return radiusScale(d.depth)})
        // .style("fill", function(d) {return colors[d.depth+2]})
        .style("fill", "#9de875")

        d3.select("svg").selectAll("circle.orbits")
        .data(orbit.orbitalRings())
        .enter()
        .insert("circle", "g")
        .attr("class", "ring")
        .attr("r", function(d) {return d.r})
        .attr("cx", function(d) {return d.x})
        .attr("cy", function(d) {return d.y})
        .style("fill", "none")
        .style("stroke", "black")
        .style("stroke-width", "1px")
        .style("stroke-opacity", 0.15)

        orbit.on("tick", function() {
            d3.selectAll("g.node")
            .attr("transform", function(d) {return "translate(" +d.x +"," + d.y+")"});

            d3.selectAll("circle.ring")
            .attr("cx", function(d) {return d.x})
            .attr("cy", function(d) {return d.y});
        });

        orbit.start();

        function nodeOver(d) {
            orbit.stop();
            d3.select(this).append("text")
            .text(d.name)
            .style("text-anchor", "middle")
            .attr("y", 35);
            d3.select(this).select("circle")
            .style("stroke", "black")
            .style("stroke-width", 3);
        }

        function nodeOut() {
            orbit.start();
            d3.selectAll("text").remove();
            d3.selectAll("g.node > circle").style("stroke", "none")
            .style("stroke-width", 0);
        }
    }

    componentWillMount() {
        //
    }

    componentDidMount() {
        // console.dir(projects);
        console.log(d3);
        console.dir(flareJson);
        if (process.browser) {
            this.drawOrbit(flareJson);
        }
    }

    render () {
        const {t} = this.props;
        return (
            <div className="orbits">
				<svg />
            </div>
        )
    }
}

export default translate('authorization')(OrbitsD3);
