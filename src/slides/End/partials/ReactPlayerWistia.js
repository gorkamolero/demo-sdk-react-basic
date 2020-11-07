import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { FlexBox } from "react-styled-flex";
import { colors, textstyles } from '../../../visly';
import './ReactPlayerWistia.css'


const urls = {
  'old' : 'https://home.wistia.com/medias/e4a27b971d',
  'young': 'https://home.wistia.com/medias/e4a27b971d'
}

const texts = [
  `Analyzing... your dog's information`,
  'Analyzing...breed-specific needs',
  'Analyzing...life stage needs',
  // 'Analyzing...health concerns',
  // 'Analyzing...activity level needs',
  // 'Analyzing...allergies & sensitivities',
  // 'Analyzing...likes and dislikes',
  'One moment please... we are building your personalized plan',
]

const Wistia = ({age = 'young', videoIsDone, setVideoIsDone}) => {
  const [state] = useState({
    pip: false,
    playing: true,
    controls: false,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  })

  const [url] = React.useState(urls[age])
  const [count, setCount] = useState(0)
  const [text, setText] = useState(texts[count])
  const textDuration = 1000

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (count < texts.length) {
        setCount(prevCount => prevCount + 1)
        console.log('YO', count)
        setText(texts[count])
      } else {
        setVideoIsDone(true)
      }
    }, textDuration);
    return () => window.clearInterval(interval);
  }, [count, setVideoIsDone]);
  
  return (
    <>
      <div className="player-container">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            {...state}
            url={url}
            width="100%"
            height="100%"
          />
        </div>
      </div>

      {
        videoIsDone || (
          <FlexBox center style={{ marginTop: -40 }}>
            <h1 style={{...textstyles.hbFeatureTitle, color: colors.hbBrown}}>{text}</h1>
          </FlexBox>
        )
      }
    </>
  );
}
 
export default Wistia;