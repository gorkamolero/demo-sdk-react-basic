import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { HbLoadingScreen } from "../visly/Pages";
import { useBreakpoint } from "../visly";
import Loading1 from '../assets/images/loading1.png'
import Loading2 from '../assets/images/loading2.png'
import Loading3 from '../assets/images/loading3.png'

function useDelayUnmount(isMounted, delayTime) {
    const [ shouldRender, setShouldRender ] = useState(false);

    useEffect(() => {
        let timeoutId;
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
  Loading2,
  Loading3,
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


const Loading = ({ timing = 6000, loading, setLoading, outTiming = 0, setLoadingScreenIsSeen, dogName }) => {
  const [rotation, setRotation] = useState(0)
  const [progress, setProgress] = useState(0)
  const size = useBreakpoint("small", ["medium", "large", "large"]);
  const [ isMounted, setIsMounted ] = useState(true);
  
  const shouldRenderChild = useDelayUnmount(isMounted, 20);
  const mountedStyle = {opacity: 1, transform: 'translateY(0)', transition: "all 250ms cubic-bezier(0.25, 1, 0.5, 1)"};
  const unmountedStyle = {opacity: 0, transform: 'translateY(-10%)', transition: "all 100ms cubic-bezier(0.25, 1, 0.5, 1)"};

  useEffect(() => {
    return () => setLoadingScreenIsSeen(true)
  }, [setLoadingScreenIsSeen])
  
  // Rotate images
  useEffect(() => {
    // if (progress === 100) return

    const interval = setInterval(
      () => {
        setRotation(rotation => rotation + 1)
        setProgress(progress + 33)
      }, timing / 3);


    return () => clearInterval(interval);
  }, [timing, progress, rotation])

  // Set loading when complete
  useEffect(() => {
    setTimeout(() => {
      setProgress(100)
    }, timing);

    setTimeout(() => {
      setIsMounted(!isMounted);
      setLoading(false)
    }, timing + 100)
  })
  
  return (
    <>
      {shouldRenderChild && (
        <LoadingScreen
          style={isMounted ? mountedStyle : unmountedStyle}
          HbProgressBar={<HbLoadingScreen.HbProgressBar value={progress / 100} />}
          HbFirstSlideFooter={
            <HbLoadingScreen.HbFirstSlideFooter
              HbFooterRectangle={<HbLoadingScreen.HbFirstSlideFooter.HbFooterRectangle title="Super premium ingredients" subtitle="Made with real meat and superfoods." />}
              HbFooterRectangle1={<HbLoadingScreen.HbFirstSlideFooter.HbFooterRectangle1 title="Vet approved" subtitle="Shop with confidence" />}
              HbFooterRectangle2={<HbLoadingScreen.HbFirstSlideFooter.HbFooterRectangle2 title="Custom nutrition" subtitle="Personalized plan for your dog" />} 
              size={size}
            />
          }
          className={`HbLoadingScreen ${rotation >= 2 ? 'lastImage' : ''} ${loading ? 'screenIsLoading' : 'screenIsLoaded'}`}
          text={`We are creating ${dogName}'s custom plan`}
          imageSrc={Loaders[rotation]}
        >
        </LoadingScreen>
      )}
    </>
  );
}
 
export default Loading;