import React from 'react';
import PropTypes from 'prop-types';
import './TypeTitles.css';

export default function TypeTitles(props) {
  console.log(props.height);
      console.log(props.width);
  return (

      <text className="Car" x={props.width/35} y={props.height/100*5}>Car
        <tspan className="Credit"x={props.width/35} y={props.height/100*7}>Credit Card</tspan>
        <tspan className="Debt"x={props.width/35} y={props.height/100*9}>Debt Consolidation</tspan>
        <tspan className="Home"x={props.width/35} y={props.height/100*11}>Home Improvement</tspan>
        <tspan className="House"x={props.width/35} y={props.height/100*13}>House</tspan>
        <tspan className="Major"x={props.width/35} y={props.height/100*15}>Major Purchase</tspan>
        <tspan className="Medical"x={props.width/35} y={props.height/100*17}>Medical</tspan>
        <tspan className="Moving"x={props.width/35} y={props.height/100*19}>Moving</tspan>
        <tspan className="Other"x={props.width/35} y={props.height/100*21}>Other</tspan>
        <tspan className="Renew"x={props.width/35} y={props.height/100*23}>Renewable Energy</tspan>
        <tspan className="Business"x={props.width/35} y={props.height/100*25}>Small Business</tspan>
        <tspan className="Vacation"x={props.width/35} y={props.height/100*27}>Vacation</tspan>
        <tspan className="Wedding"x={props.width/35} y={props.height/100*29}>Wedding</tspan>
      </text>
    
  );

}
/*
TypeTitles.propTypes = {
  typeCenters: PropTypes.objectOf(PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired).isRequired,
}
*/