import React, { useContext } from "react";
import {
  HbProgress,
  HbProgressStep,
} from "../../visly";
import { SlideContext } from "../../context/SlideContext";

const ProgressBar = ({size}) => {
  const { progress, progressBar, slideModel } = useContext(SlideContext);

  const [activeStep, setActiveStep] = React.useState({})
  React.useEffect(() =>  {
    const el = progressBar.find((el) => el.slideId === slideModel.id);
    setActiveStep(el);
  }, [slideModel.id, progressBar])

  return (
    <HbProgress
      // style={{ pointerEvents: "none" }}
      HbProgressBar={<HbProgress.HbProgressBar value={progress / 100} />}
    >
      {progressBar.map(({ title, slideId }, i) => {
        if (!title) return null;
        if (progressBar[i - 1] && progressBar[i-1].title === title) return null;

        const isActiveStep = activeStep.slideId === slideId;
        const isNextStep = progressBar.findIndex(el => el.id === activeStep.id) + 1 === i


        return (
          <HbProgressStep
            size={size}
            key={slideId}
            stepTitle={title}
            HbActiveStep={isActiveStep}
            HbFutureStep={!isActiveStep && !isNextStep}
          ></HbProgressStep>
        );
      })}
    </HbProgress>
  );
};

export default ProgressBar;
