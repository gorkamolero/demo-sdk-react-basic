import React from 'react';
import './switch.css'
import {textstyles } from '../../visly'

const Switch = ({checked = true, onChange}) => {
  const text = checked ? "One-Time Purchase" : "Subscribe & Save 20%"
  return (
    <label className="switch" style={{ fontFamily: textstyles.bodyLarge }}>
      <input checked={checked} className="switch-input" type="checkbox" onChange={onChange} />
      <span className="switch-label" data-on="Subscribe &amp; Save 20%" data-off="One-Time Purchase" style={{ fontFamily: textstyles.bodyLarge }}>
      </span> 
      <span className="switch-handle" data-dynamic={text} id="switch-handle" style={{ fontFamily: textstyles.bodyLarge }}></span> 
    </label>
  );
}
 
export default Switch;