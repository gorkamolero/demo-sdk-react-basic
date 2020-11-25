import React from 'react';
import './switch.css'
import { textstyles, colors } from '../../visly'

const Switch = ({checked = true, texts, onChange}) => {
  if (!texts) return null
  const onText = texts.plan.rest.SwitchSubscribeText || ''
  const offText = texts.plan.rest.SwitchOneTimeText || ''
  const text = checked ? offText : onText
  return (
    <label className="switch" style={{ fontFamily: textstyles.bodyLarge }}>
      <input checked={checked} className="switch-input" type="checkbox" onChange={onChange} />
      <span className="switch-label" data-on={onText} data-off={offText} style={{ fontFamily: textstyles.bodyLarge, backgroundColor: colors.hbGoldLight }}>
      </span> 
      <span className="switch-handle" data-dynamic={text} id="switch-handle" style={{ fontFamily: textstyles.bodyLarge }}></span> 
    </label>
  );
}
 
export default Switch;