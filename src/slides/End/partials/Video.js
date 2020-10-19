import React from 'react';
import VideoPop from '../../../plugins/react-video-pop';
import { FlexBox } from "react-styled-flex";
import styled from 'styled-components';
import Scene from '../../../assets/video/lava.webm';

const VideoContainer = styled(FlexBox)`
  width: 1047px;
  height: 0;
  padding-bottom: 56.25%;
  padding-bottom: 40%;
  position: relative;
  margin-top: -80px;
  margin-bottom: 80px;
`

const Video = () => {
  return (
    <VideoContainer>
      <VideoPop Src={Scene} mute={true} autoplay={true}   root="video-root" ratio={{w:16,h:9}} />
    </VideoContainer>
  );
}
 
export default Video;