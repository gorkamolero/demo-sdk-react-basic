import React, { useEffect, useState } from 'react';
import ReactSrcDocIframe from 'react-srcdoc-iframe'

const styler = `<style>body { padding: 0 !important; margin: 0 !important; </style>`


const Wistia = ({video}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true)
    return () => { setVisible(false) }
  }, [])

  if (!visible) return <div></div>
  
  return (
    <div className="player-container">
      <div className="player-wrapper" id="iframe-wrapper">
        <ReactSrcDocIframe className="player-iframe" srcDoc={visible ? styler + video : ''} />
      </div>
    </div>
  );
}
 
export default Wistia;