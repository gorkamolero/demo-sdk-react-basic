import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player'
import { FooterBar } from '../../../styles/StyledComps';
import { HbSection } from '../../../visly/Pages';
import './ReactPlayerWistia.css'

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

const Wistia = ({video, videoIsDone, setVideoIsDone, play}) => {
  const [state] = useState({
    pip: false,
    playing: play || true,
    controls: true,
    light: false,
    volume: 0.8,
    muted: false,
    played: 0,
    loaded: 0,
    duration: 0,
    playbackRate: 1.0,
    loop: false
  })

  const [count, setCount] = useState(0)
  const [text, setText] = useState(texts[count])
  const textDuration = 1000

  useEffect(() => {
    if (!play) return
    const interval = window.setInterval(() => {
      if (count < texts.length) {
        setCount(prevCount => prevCount + 1)
        setText(texts[count])
      } else {
        setVideoIsDone(true)
      }
    }, textDuration);
    return () => window.clearInterval(interval);
  }, [count, setVideoIsDone, play]);
  
  return (
    <HbSection noHeadNoPadding>
      <div className="player-container">
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            {...state}
            url={'https://hungrybark.wistia.com/embed/iframe/bmwh267dv6?embedType=ab_test_async&idType=ab-test&seo=true&videoFoam=true&videoWidth=640'}
            width="100%"
            height="100%"
          />
        </div>
      </div>

      {
        (videoIsDone && play) || (
          <FooterBar center text={text} />
        )
      }
    </HbSection>
  );
}
 
export default Wistia;