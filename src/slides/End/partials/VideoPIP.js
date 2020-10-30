import React, { useEffect, useState, useRef } from 'react';
import usePortal from 'react-cool-portal';
import VideoPop from '../../../plugins/react-video-pop';
import ReactPlayer from 'react-player/wistia'
import { FlexBox } from "react-styled-flex";
import styled from 'styled-components';
import Scene from '../../../assets/video/lava.webm';
import Reactpip from 'react-picture-in-picture'

const VideoContainer = styled(FlexBox)`
  width: 1047px;
  height: 0;
  padding-bottom: 56.25%;
  padding-bottom: 40%;
  position: relative;
  margin-top: -80px;
  margin-bottom: 80px;
`

const PipContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 300px;
`

const Video = () => {
  const desktopper = useRef(null);
  const pipper = useRef(null);
  const { Portal } = usePortal({ containerId: 'video-root' });
  const [progress, setProgress] = useState(null)

  /* const handleSeekTo = (value) => {
    ref.current.seekTo(value);
  }; */

  /* useEffect(() => {
    if (pip) {
      const progress = desktopper.current.getCurrentTime()
      pipper.current.seekTo(progress)
    } else {
      const progress = pipper.current.getCurrentTime()
      desktopper.current.seekTo(progress)
    }
  }, [pip]) */

  return (
    <>
      <Portal>
        <PipContainer>
          <ReactPlayer ref={pipper} url={'https://mchedlish.wistia.com/medias/kor3rd5ec8'}  />
        </PipContainer>
      </Portal>

      <VideoContainer>
        <ReactPlayer ref={desktopper} url={'https://mchedlish.wistia.com/medias/kor3rd5ec8'}  />
      </VideoContainer>
    </>
  );
}
 
export default Video;