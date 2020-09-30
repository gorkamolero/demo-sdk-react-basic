import React, { useContext, useState } from 'react';
import { FlexBox } from "react-styled-flex";
import { SlideContext } from '../context/SlideContext';
import Utils from 'utils/Utils'
import Cover from '../slides/Cover/Cover';
import Filter from '../slides/Filter/Filter';
import Info from '../slides/Info/Info';
import Feedback from '../slides/Feedback/Feedback';
import Form from '../slides/Form/Form';
import End from '../slides/End/End';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { HbHeader, HbContainer, useBreakpoint } from "visly";
import LargeBG from 'assets/images/svg-bg-large.svg'
import MidBG from 'assets/images/svg-bg-medium.svg'
import SmallBG from 'assets/images/svg-bg-small.svg'
import Bowl from 'assets/images/Bowl.png'

const Slide = () => {
    const { slideModel } = useContext(SlideContext);
    const [slideId, setSlideId] = useState(null);
    const size = useBreakpoint("small", ["medium", "large", "super"]);


    if (slideId !== slideModel.getId()) setSlideId(slideModel.getId());

    const getSlideView = () => {
        switch (slideModel.getType()) {
            case 'Cover': return <Cover />;
            case 'Filter': return <Filter />;
            case 'Info': return <Info />;
            case 'Feedback': return <Feedback />;
            case 'Form': return <Form />;
            case 'End': return <End />;
            default: return null;
        }
    };

    return (
      <FlexBox column center>
        <HbHeader
          TextSlot="20% Off"
          title={Utils.stripHtml(slideModel.getTitle())}
          slideDescription={Utils.stripHtml(slideModel.getSubtitle())}
          HbLogo={<HbHeader.HbLogo />}
          HbProgress={<ProgressBar size={size} />}
          HbProgressMobile={<ProgressBar size={size} />}
          HbCircleIcon={<HbHeader.HbCircleIcon />}
          bg={size === "small" ? SmallBG : size === "medium" ? MidBG : LargeBG}
          extraImage={Bowl}
          extraImageT={Bowl}
          size={size}
        />
        <HbContainer>{getSlideView()}</HbContainer>
      </FlexBox>
    );
};

export default Slide