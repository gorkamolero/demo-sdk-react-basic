import React, { useContext, useMemo } from 'react';
import { SlideContext } from '../../context/SlideContext';
import './Navigation.css'
import { HbButtonGroup, HbButton } from "../../visly";
import { CSSTransition } from "react-transition-group";

function Navigation({back, next, restart}) {
  const {nav, slideModel, progressBar} = useContext(SlideContext);

  // nav.next()

  // Allow handlers override
  back = back || nav.back;
  next = next || nav.next;
  restart = restart || nav.restart;  

  const nextSlideIsEndSlide = useMemo(() => {
    const me = progressBar.find((el) => el.slideId === slideModel.id);
    const next = progressBar[progressBar.indexOf(me) + 1]
    return (next.slideId === 'end')
  }, [progressBar, slideModel])

  // slideModel.restart()

  // const isValid = slideModel.validate ? slideModel.validate() : false;
  const isValid = slideModel.validate ? slideModel.validate() : false;
  const isBlocked = false

  return (
    <>
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
          <>
          {
            isValid && nav.canNext && (
              <HbButton
                text={isBlocked ? 'Coming soon' : nextSlideIsEndSlide ? 'Show me my custom plan' : 'Continue'}
                disabled={!nav.canNext || isBlocked || !isValid}
                onPress={next}
              />
            )
          }
          </>
        </CSSTransition>
      </HbButtonGroup>
    </>
  );
}

// Navigation.whyDidYouRender = true

export default Navigation;