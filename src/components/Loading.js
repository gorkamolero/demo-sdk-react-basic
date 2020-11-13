import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { HbLoadingScreen } from "../visly/Pages";
import { useBreakpoint } from "../visly";
import Loading1 from '../assets/images/loading1.png'
import Loading2 from '../assets/images/loading2.png'

function useDelayUnmount(isMounted: boolean, delayTime: number) {
    const [ shouldRender, setShouldRender ] = useState(false);

    useEffect(() => {
        let timeoutId: number;
        if (isMounted && !shouldRender) {
            setShouldRender(true);
        }
        else if(!isMounted && shouldRender) {
            timeoutId = setTimeout(
                () => setShouldRender(false), 
                delayTime
            );
        }
        return () => clearTimeout(timeoutId);
    }, [isMounted, delayTime, shouldRender]);
    return shouldRender;
}

const Loaders = [
  Loading1,
  Loading2
]

const LoadingScreen = styled(HbLoadingScreen)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0;
  background: white;
  z-index: 99999999999;
  & > * {
    width: 100%;
  }
`

const Img = styled.img`
  width: 100%;
  max-width: 400px;
  /* object-fit: cover; */
`


const Loading = ({ timing = 1000, setLoading, outTiming = 3000, setLoadingScreenIsSeen }) => {
  const [rotation, setRotation] = useState(0)
  const [progress, setProgress] = useState(0)
  const size = useBreakpoint("small", ["medium", "large", "large"]);
  const [ isMounted, setIsMounted ] = useState(true);
  
  const shouldRenderChild = useDelayUnmount(isMounted, 100);
  const mountedStyle = {opacity: 1, transform: 'translateY(0)', transition: "all 1000ms cubic-bezier(0.25, 1, 0.5, 1)"};
  const unmountedStyle = {opacity: 0, transform: 'translateY(-10%)', transition: "all 1000ms cubic-bezier(0.25, 1, 0.5, 1)"};

  useEffect(() => {
    return () => setLoadingScreenIsSeen(true)
  }, [setLoadingScreenIsSeen])
  
  // Rotate images
  useEffect(() => {
    let min = 0, max = Loaders.length - 1, step = +1, now = 0;

    const interval = setInterval(() => {
        if(now >= max) {step = -1;}
        if(now <= min) {step = +1;}
        now += step;
        setRotation(now)
    }, timing);


    return () => clearInterval(interval);
  }, [timing])
  
  // Rotate progress
  useEffect(() => {
    let min = 0, step = 20, now = 0;

    const interval = setInterval(() => {
        now += Math.floor(Math.random() * step) + min  ;
        // if (now <= max) { clearInterval(interval) }
        setProgress(now)
    }, timing * 2 / 3);


    return () => clearInterval(interval);
  }, [timing])

  // Set loading when complete
  useEffect(() => {
    setTimeout(() => {
      setProgress(100)
      setTimeout(() => {
        setIsMounted(!isMounted);
        setLoading(false)
      }, timing)
    }, outTiming);
  })
  
  return (
    <>
      {shouldRenderChild && (
        <LoadingScreen
          style={isMounted ? mountedStyle : unmountedStyle}
          HbProgressBar={<HbLoadingScreen.HbProgressBar value={progress / 100} />}
          HbFirstSlideFooter={
            <HbLoadingScreen.HbFirstSlideFooter
              size={size}
            />
          }
          className="HbLoadingScreen"
          text="We are creating Oscar's custom plan"
        >
          <Img src={Loaders[rotation]} />
        </LoadingScreen>
      )}
    </>
  );
}
 
export default Loading;