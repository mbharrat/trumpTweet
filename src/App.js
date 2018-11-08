import React from 'react'
import * as d3 from 'd3'
import './App.css'
import BubbleChart from './components/BubbleChart'
import Bubbles from './components/Bubbles'
import TypeTitles from './components/TypeTitles'
import GroupingPicker from './components/GroupingPicker'
import { createNodes } from './utils'
import { width, height, center, typeCenters } from './constants'
import GitButton from './components/GitButton';


export default class App extends React.Component {
  state = {
    data: [],
    grouping: 'all',
  }

  componentDidMount() {
    
    
      d3.csv('data/Trump2018.csv', (err, data)=>{
      if (err!== null) {
        alert("Could not load Tweets");
        return
      }
      //console.log(data);
      this.setState({
        data: createNodes(data),
      })
    })


      const script = document.createElement("script");
      script.src = "https://buttons.github.io/buttons.js";
      script.async=true;
      script.defer=true;

      document.head.appendChild(script);




      
  }

  onGroupingChanged = (newGrouping) => {
    this.setState({
      grouping: newGrouping,
    })
  }

  render() {
    const { data, grouping } = this.state
    return (
      <div className="App">
        <br/>
        <div className="Git">
        <GitButton/>
        </div>
        <GroupingPicker onChanged={this.onGroupingChanged} active={grouping} />
        <h2 className="Error">Please look at this page on a computer</h2>
        <BubbleChart width={width} height={height}>

        <Bubbles data={data} forceStrength={0.03} center={center} typeCenters={typeCenters} groupByType={grouping === 'type'} />
          {
            grouping === 'type' &&
            <g>
            <TypeTitles height={height} width={width}/>
            </g>
          }
        </BubbleChart>
      </div>
    )
  }

}
