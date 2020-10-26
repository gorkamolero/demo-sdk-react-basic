import React from 'react';
import './switch.css'
import {textstyles } from '../../visly'

const Switch = ({onChange}) => {
  return (
    <label className="switch" style={{ fontFamily: textstyles.bodyLarge }}>
      <input className="switch-input" type="checkbox" ng-model="onetime" onChange={onChange} />
      <span className="switch-label" data-on="Subscribe &amp; Save 20%" data-off="One-Time Purchase" style={{ fontFamily: textstyles.bodyLarge }}></span> 
      <span className="switch-handle" data-dynamic="Subscribe &amp; Save 20%" id="switch-handle" style={{ fontFamily: textstyles.bodyLarge }}></span> 
    </label>
  );
}
 
export default Switch;