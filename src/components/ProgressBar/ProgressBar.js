import React, {useContext} from 'react';
import { HbProgressBar, HbProgressStep } from "visly";
import {SlideContext} from "../../context/SlideContext";

const ProgressBar = () => {
    const {progress} = useContext(SlideContext);

    return (
      <>
        <HbProgressBar value={progress / 100} />
        {/* Map Step progress */}
        <HbProgressStep
          stepTitle="Step"
          HbProgressButton={<HbProgressStep.HbProgressButton />}
        />
      </>
    );
};

export default ProgressBar;