import React from 'react'
import PropTypes from 'prop-types';
import * as d3 from 'd3'
import { fillColor } from '../utils'
import tooltip from './Tooltip'

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props)
    const { forceStrength, center } = props
    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .on('tick', this.ticked.bind(this))
      .stop()
  }

  state = {
    g: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data)
    }
    if (nextProps.groupByType !== this.props.groupByType) {
      this.regroupBubbles(nextProps.groupByType)
    }
    
   
  }

  shouldComponentUpdate() {
    //make react ignore
    return false
  }

  onRef = (ref) => {
    this.setState({ g: d3.select(ref) }, () => this.renderBubbles(this.props.data))
  }

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius ** 2.0)
  }

  regroupBubbles = (groupByType) => {
    const { forceStrength, typeCenters, center } = this.props
    if (groupByType) {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(d => typeCenters[d.year].x))
                      .force('y', d3.forceY().strength(forceStrength).y(d => typeCenters[d.year].y))
    }else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                      .force('y', d3.forceY().strength(forceStrength).y(center.y))
    }
    this.simulation.alpha(1).restart()
  }

  regroupBubblesType = (groupByType) => {
    const { forceStrength, typeCenters, center } = this.props
    if (groupByType) {
      console.log("hit");
    }else {
      this.simulation.force('x', d3.forceX().strength(forceStrength).x(center.x))
                      .force('y', d3.forceY().strength(forceStrength).y(center.y))
    }
    this.simulation.alpha(1).restart()
  }

  renderBubbles(data) {
    const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id)

    // Exit
    bubbles.exit().remove()

    // Enter
    const bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => fillColor(d.tweet))
      .attr('stroke', d => d3.rgb(fillColor(d.tweet)).darker())
      .attr('stroke-width', 2)
      .on('mouseover', showDetail)  
      .on('mouseout', hideDetail) 

    bubblesE.transition().duration(2000).attr('r', d => d.radius).on('end', () => {
      this.simulation.nodes(data)
      .alpha(1)
      .restart()
    })
  }

  render() {
    return (
      <g ref={this.onRef} className="bubbles" />
    )
  }
}

Bubbles.propTypes = {
  center: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  forceStrength: PropTypes.number.isRequired,
  groupByType: PropTypes.bool.isRequired,
  typeCenters: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    radius: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    tweet: PropTypes.string.isRequired,
    year:PropTypes.number.isRequired,
  })),
}

export function showDetail(d) {
    // change outline to indicate hover state.
  d3.select(this).attr('stroke', 'black')

  const content = `<span class="name">Tweet: </span><span class="value">${
                  d.tweet
                  }</span><br/>` +
                  `<span class="name">Favorites: </span><span class="value">${
                  d.value
                  }</span><br/>` +
                  `<span class="name">Year: </span><span class="value">${
                  d.year
                  }</span>`


  tooltip.showTooltip(content, d3.event)
}

//hide tooltip
export function hideDetail(d) {
  d3.select(this)
      .attr('stroke', d3.rgb(fillColor(d.tweet)).darker())

  tooltip.hideTooltip()
}