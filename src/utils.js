import * as d3 from 'd3'

/*
   * This data manipulation function takes the raw data from
   * the CSV file and converts it into an array of node objects.
   * Each node will store data and visualization values to visualize
   * a bubble.
   *
   * rawData is expected to be an array of data objects, read in from
   * one of d3's loading functions like d3.csv.
   *
   * This function returns the new node array, with a node in that
   * array for each element in the rawData input.
   */
export function createNodes(rawData) {
    // Use the max total_amount in the data as the max in the scale's domain
    // note we have to ensure the total_amount is a number.
  const maxAmount = d3.max(rawData, d => +d.favorite_count)

    // Sizes bubbles based on area.
    // @v4: new flattened scale names.
  const radiusScale = d3.scalePow()
      .exponent(1)
      .range([2, 12])
      .domain([0, maxAmount])

    // Use map() to convert raw data into node data.
    // Checkout http://learnjsdata.com/ for more on
    // working with data.
  const myNodes = rawData.map(d => ({
    id: d.status_id,
    radius: radiusScale(+d.favorite_count),
    value: +d.favorite_count,
    tweet: d.text,
    year: d.year,
    x: Math.random() * 900,
    y: Math.random() * 800,
  }))

    // sort them descending to prevent occlusion of smaller nodes.
  myNodes.sort((a, b) => b.value - a.value)

  return myNodes
}

//export const fillColor = d3.scaleOrdinal().domain(['debt_consolidation', 'wedding', 'vacation']).range(['#ffff00', '#7fffd4', '#663096'])

export const fillColor = d3.scaleOrdinal().domain([2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]).range(['#C0C0C0','#FF0000','#800000','#D35400','#808000','#00FF00','#008000','#00FFFF','#008080','#0000FF' ])
