import React, { useEffect, useContext, useState } from 'react';
import { SlideContext } from "../../../context/SlideContext";
import { FooterBar } from '../../../styles/StyledComps';


const MyWistiaFooter = ({dogName = 'Oscar', setVideoIsDone, className}) => {
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
    if (textsAndTimes.length === count + 1) {
      console.warn('YOOOO', 'istru')
      setVideoIsDone(true)
      return
    }
    
    let timer = setTimeout(() => {
      setCount(count => count + 1)
    }, [textsAndTimes[count].time * 1000])
    // }, [(count < 15) ? 10 : textsAndTimes[count].time * 1000])

    return () => clearTimeout(timer)

  }, [textsAndTimes, count, setVideoIsDone])
  
  if (!textsAndTimes) return <div></div>

  const text = textsAndTimes.length === count + 1 ? dogName + "'s " + textsAndTimes[count].text : textsAndTimes[count].text
  
  return (
    <FooterBar end={textsAndTimes.length === count + 1} className={`FooterBar ${className ? className : ''}`} center text={text} />
  )
}

export default MyWistiaFooter