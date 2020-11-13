import React, { useEffect, useState } from 'react';
import Frame from 'react-frame-component'
import { FooterBar } from '../../../styles/StyledComps';
import { HbSection } from '../../../visly/Pages';
import {CSSTransition} from 'react-transition-group'

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



const iframeMarkup = (videoURL) => `
<!DOCTYPE html>
  <html>
    <head>
      <script src="${videoURL}" async></script>
      <script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
    </head>
    <body style="padding: 0; margin: 0; overflow: hidden;">
          <div class="wistia_embed wistia_async_bmwh267dv6 idType=ab-test seo=true videoFoam=true" style="height:100%;position:relative;width:100%">&nbsp;</div>
    </body>
</html>
  `

const Wistia = ({video, videoIsDone, setVideoIsDone, play}) => {

  const [count, setCount] = useState(0)
  const [text, setText] = useState(texts[count])
  const textDuration = 1000

  const markup = iframeMarkup(video)
  console.log('Wistia!', markup);

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
      <CSSTransition
        in={true}
        timeout={200}
        classNames="collapse-after"
        unmountOnExit
        mountOnEnter
      >
        <div className="player-container">
          <div className="player-wrapper">
            <Frame className="player-iframe" initialContent={markup} />
          </div>
        </div>
      </CSSTransition>
      

      {
        (videoIsDone && play) || (
          <FooterBar className="FooterBar" center text={text} />
        )
      }
    </HbSection>
  );
}
 
export default Wistia;