import React, { useContext, useEffect, useMemo, useState } from 'react';
import { SlideContext } from '../../context/SlideContext';
import './Navigation.css'
import { HbButtonGroup, HbButton } from "../../visly";
import { CSSTransition } from "react-transition-group";
import Loading from 'components/Loading';

function Navigation({back, next, restart}) {
  const {nav, slideModel, progressBar} = useContext(SlideContext);

  const nextSlideIsEndSlide = useMemo(() => {
    const me = progressBar.find((el) => el.slideId === slideModel.id);
    const next = progressBar[progressBar.indexOf(me) + 1]
    return (next.slideId === 'end')
  }, [progressBar, slideModel])

  const [loading, setLoading] = useState(false)
  const [goToRecs, setGoToRecs] = useState(false)

  // Allow handlers override
  back = back || nav.back;
  next = next || nav.next;
  restart = restart || nav.restart;

  console.log('IS NEXT', nextSlideIsEndSlide)

  // Could evaluate if next screen has a loader fe
  const navNext = () => {
    console.log('YOLO', nextSlideIsEndSlide)
    if (nextSlideIsEndSlide) setLoading(true)
    // console.log('IS LOADING', loading)
    // if (!loading) next()
  }

  useEffect(() => {
    if (goToRecs) next()
    return () => setLoading(false)
  }, [goToRecs])

  // nav.back()

  // const isValid = slideModel.validate ? slideModel.validate() : false;
  const isValid = slideModel.validate ? slideModel.validate() : false;
  const isBlocked = false

  return (
    <>
      {
        loading && (
          <Loading setLoading={setLoading} timing={1000} outTiming={3000} setGoToRecs={setGoToRecs} />
        )
      }
      <HbButtonGroup>
        <CSSTransition
          in={nav.canBack}
          timeout={200}
          classNames="collapse-after"
          unmountOnExit
          mountOnEnter
        >
          <HbButton
            text="Previous step"
            variant="contained"
            disabled={!nav.canBack}
            onPress={() => back()}
          />
        </CSSTransition>
        
        <CSSTransition
          in={nav.canRestart}
          timeout={200}
          classNames="collapse-after"
          unmountOnExit
          mountOnEnter
        >
          <HbButton
            text="Restart"
            disabled={!nav.canRestart}
            onPress={() => restart()}
          />
        </CSSTransition>
        
        <CSSTransition
          in={(isValid && nav.canNext) || nextSlideIsEndSlide}
          timeout={200}
          classNames="collapse-after"
          unmountOnExit
          mountOnEnter
        >
          <HbButton
            text={isBlocked ? 'Coming soon' : nextSlideIsEndSlide ? 'Show me my custom plan' : 'Continue'}
            disabled={!nav.canNext || isBlocked || !isValid}
            onPress={nextSlideIsEndSlide ? navNext : next}
          />
        </CSSTransition>
      </HbButtonGroup>
    </>
  );
}

// Navigation.whyDidYouRender = true

export default Navigation;