import React, { useContext, useState, useMemo } from 'react';
import { ModalProvider } from "react-modal-hook";
import { FlexBox } from "react-styled-flex";
import { SlideContext } from '../context/SlideContext';
import Utils from '../utils/Utils'
import Cover from '../slides/Cover/Cover';
import Filter from '../slides/Filter/Filter';
import Info from '../slides/Info/Info';
import Feedback from '../slides/Feedback/Feedback';
import Form from '../slides/Form/Form';
import End from '../slides/End/End';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { HbHeader, useBreakpoint } from "../visly";
import { HbContainer, HbTitle, HbSubtitle } from "../styles/StyledComps";
import LargeBG from '../assets/images/svg-bg-large.svg'
import MidBG from '../assets/images/svg-bg-medium.svg'
import SmallBG from '../assets/images/svg-bg-small.svg'
import Bowl from '../assets/images/Bowl.png'

const SlideView = ({slideModel}) => {
  const type = useMemo(() => slideModel.getType(), [slideModel])

  return (
    <>
      {
        {
          'Cover':  <Cover />,
          'Filter':<Filter />,
          'Info':<Info />,
          'Feedback':<Feedback />,
          'Form':<Form />,
          'End':<End />,
        }[type]
      }
    </>
  )
}

const Slide = () => {
    const { slideModel, interpolate, progressBar } = useContext(SlideContext);
    const [slideId, setSlideId] = useState(null);
    const size = useBreakpoint("small", ["medium", "large", "super"]);


    React.useEffect(() => {
      if (slideId !== slideModel.getId()) setSlideId(slideModel.getId());
    }, [slideModel, slideId])

    const slideTitle = useMemo(() => progressBar.find(step => step.slideId === slideModel.getId()).title, [slideModel, progressBar])
    const title = useMemo(() => interpolate(Utils.stripHtml(slideModel.getTitle())), [slideModel, interpolate])
    const subtitle = useMemo(() => interpolate(Utils.stripHtml(slideModel.getSubtitle())), [slideModel, interpolate])
    const type = useMemo(() => slideModel.getType(), [slideModel])

    const Container = slideModel.getType() === 'End' ? FlexBox : HbContainer
    const isEndSlide = slideModel.getType() === 'End'

    return (
      <ModalProvider>
        <FlexBox column center className={`slide-${type} animate`}>
          <HbHeader
            className="HbHeader"
            TitleSlot={<HbTitle size={size} className="title" html={title} />}
            
            SubtitleSlot={<HbSubtitle size={size} className="subtitle" html={subtitle} />}
            HbLogo={<HbHeader.HbLogo />}
            HbProgress={<ProgressBar size={size} />}
            HbProgressMobile={<ProgressBar size={size} />}
            HbCircleIcon={<HbHeader.HbCircleIcon />}
            bg={size === "small" ? SmallBG : size === "medium" ? MidBG : LargeBG}
            extraImage={Bowl}
            extraImageT={Bowl}
            size={size}
            discount="20% Off"
            ShowImage={slideTitle === 'Profile'}
            NoWave={ isEndSlide }
            withVideo={ isEndSlide }
          />
            <FlexBox is="main" column alignItems="center" style={{ position: 'relative', zIndex: 3 }}>
              <Container style={{ width: '100%', position: 'relative', marginTop: isEndSlide ? '-60px' : 0 }} alignItems="center" column>
                <SlideView slideModel={slideModel} />
              </Container>
            </FlexBox>
        </FlexBox>
      </ModalProvider>
    );
};

Slide.whyDidYouRender = true

export default Slide
