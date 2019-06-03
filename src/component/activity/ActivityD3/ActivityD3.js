import React, { createRef, Component } from 'react'
import * as d3 from 'd3'

class ActivityD3 extends Component {
  constructor(props) {
    super(props)
    this.ref = createRef()
    this.createPie = d3
      .pie()
      .value(d => d.value)
      .sort(null)
    this.createArc = d3
      .arc()
      .innerRadius(props.innerRadius)
      .outerRadius(props.outerRadius)
    this.colors = d3.scaleOrdinal(d3.schemeBlues[9])
    this.format = d3.format('.2%')
  }
  componentDidMount() {
    const svg = d3.select(this.ref.current)
    const data = this.createPie(this.props.data)
    const { width, height, innerRadius, outerRadius } = this.props

    svg
      .attr('class', 'chart')
      .attr('width', width)
      .attr('height', height)

    const group = svg
      .append('g')
      .attr('transform', `translate(${width / 2} ${width / 2})`)

    const groupWithEnter = group
      .selectAll('g.arc')
      .data(data)
      .enter()

    const path = groupWithEnter.append('g').attr('class', 'arc')

    path
      .append('path')
      .attr('class', 'arc')
      .attr('d', this.createArc)
      .attr('fill', (d, i) => this.colors(d.index))

    path
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', d => `translate(${this.createArc.centroid(d)})`)
      .style('fill', 'white')
      .style('font-size', 24)
      .style(
        'text-shadow',
        '-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black'
      )
      .text(d => this.format(d.value))
  }

  componentWillUpdate(nextProps, nextState) {
    const svg = d3.select(this.ref.current)
    const data = this.createPie(nextProps.data)

    const group = svg
      .select('g')
      .selectAll('g.arc')
      .data(data)

    group.exit().remove()

    const groupWithUpdate = group
      .enter()
      .append('g')
      .attr('class', 'arc')

    const path = groupWithUpdate.append('path').merge(group.select('path.arc'))

    path
      .attr('class', 'arc')
      .attr('d', this.createArc)
      .attr('fill', (d, i) => this.colors(i))

    const text = groupWithUpdate.append('text').merge(group.select('text'))
    var arc = d3
      .arc()
      .outerRadius(170)
      .innerRadius(0)

    text
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle')
      .attr('transform', function(d) {
        var _d = arc.centroid(d)
        _d[0] *= 2.2 //multiply by a constant factor
        _d[1] *= 2.2 //multiply by a constant factor
        return 'translate(' + _d + ')'
      })
      .text(d => this.format(d.value))
  }

  render() {
    return <svg ref={this.ref} />
  }
}

export default ActivityD3
