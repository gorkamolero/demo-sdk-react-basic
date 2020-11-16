import React, { useContext, useMemo, useEffect, useRef } from 'react';
import { SlideContext } from '../../context/SlideContext';
import './Navigation.css'
import { HbButton, useBreakpoint } from "../../visly";
import { CSSTransition } from "react-transition-group";
import { FlexBox, FlexItem } from 'react-styled-flex';

function Navigation({back, next, restart}) {
  const {nav, slideModel, progressBar} = useContext(SlideContext);
  const navRef = useRef();

  useEffect(() => {
    if (navRef.current) {
      navRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  })

  const size = useBreakpoint("small", ["medium", "large", "super"]);
  
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

  const isValid = slideModel.validate()
  console.log(isValid)

  return (
    <>
      <FlexBox gap="10px"
        reverse={nextSlideIsEndSlide && size === 'small'}
        className={`HbButtonGroup Navigation ${!nav.canNext || !isValid ? 'hideContinue': ''}`}
        column={size === 'small' && nextSlideIsEndSlide}
        center
        is="nav"
      >
        <CSSTransition
          in={nav.canBack}
          timeout={200}
          classNames="collapse-after"
          unmountOnExit
          mountOnEnter
        >
          <HbButton
            text="Go Back"
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
        {
          (!nav.canNext || !isValid) || (
            <FlexItem ref={navRef} flex="1" className={`continueButton`}>
              <HbButton
                id="ContinueButton"
                text={nextSlideIsEndSlide ? 'Show me my custom plan' : 'Continue'}
                disabled={!nav.canNext || !isValid}
                onPress={next}
              />
            </FlexItem>   
          )
        }
      </FlexBox>
    </>
  );
}

// Navigation.whyDidYouRender = true

export default Navigation;