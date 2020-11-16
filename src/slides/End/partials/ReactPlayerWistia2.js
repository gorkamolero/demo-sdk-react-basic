import React, { useEffect, useContext, useState } from 'react';
import { SlideContext } from "../../../context/SlideContext";
import { FooterBar } from '../../../styles/StyledComps';
import { HbSection } from '../../../visly/Pages';
import ReactSrcDocIframe from 'react-srcdoc-iframe'


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

const MyWistiaFooter = ({videoIsDone, setVideoIsDone}) => {
  const { getDatasheet } = useContext(SlideContext)
  const [textsAndTimes, setTextsAndTimes] = useState(null)
  const [count, setCount] = useState(0)

  // console.log('WISSSS', textsAndTimes,  textsAndTimes && textsAndTimes.length === count)

  useEffect(() => {
    const id = 'qwKF1uB4A7V'
    const getTextsAndTimes = async () => {
      try {
        let textsAndTimes = await getDatasheet([{id}])
        // console.log(textsAndTimes)
        console.log(textsAndTimes)
        textsAndTimes = textsAndTimes.result[id]
        setTextsAndTimes(textsAndTimes)
      } catch(err) {
        console.error(err)
      }
    }

    getTextsAndTimes()
  }, [getDatasheet])

  useEffect(() => {
    if (!textsAndTimes ) return 
    if (textsAndTimes.length === count) {
      setVideoIsDone(true)
      return
    }

    // if (timer) clearTimeout(timer)
    
    let timer = setTimeout(() => {
      setCount(count => count + 1)
    }, [textsAndTimes[count].time * 1000])

    return () => clearTimeout(timer)

  }, [textsAndTimes, count, setVideoIsDone])

  // useEffect(() => {
  //   const interval = window.setInterval(() => {
  //     if (count < texts.length) {
  //       setCount(prevCount => prevCount + 1)
  //       setText(textsAndTimes[count])
  //       // debugger
  //     } else {
  //       setVideoIsDone(true)
  //     }
  //   }, textDuration);
  //   return () => window.clearInterval(interval);
  // }, [count, setVideoIsDone]);

  if (!textsAndTimes || textsAndTimes.length === count) return <div></div>
  return (
    <FooterBar className="FooterBar" center text={textsAndTimes[count].text} />
  )
}

const Wistia = ({video, videoIsDone, setVideoIsDone, play}) => {
  const [visible, setVisible] = useState(false);

  const markup = iframeMarkup(video)

  useEffect(() => {
    setVisible(true)
    return () => { setVisible(false) }
  }, [])

  if (!visible) return <div></div>
  
  return (
    <HbSection noHeadNoPadding style={{ margin: '0 auto' }}>
      {
        visible && (
          <div className="player-container">
            <div className="player-wrapper" id="iframe-wrapper">
              <ReactSrcDocIframe className="player-iframe" srcDoc={visible ? markup : ''} />
            </div>
          </div>
        )
      }

      {
        (videoIsDone && play) || (
          <MyWistiaFooter video={video} videoIsDone={videoIsDone} setVideoIsDone={setVideoIsDone} play={play} />
        )
      }
    </HbSection>
  );
}
 
export default Wistia;