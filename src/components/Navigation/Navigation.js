import React, { useContext, useMemo, useEffect } from 'react';
import { SlideContext } from '../../context/SlideContext';
import './Navigation.css'
import { HbButton, useBreakpoint } from "../../visly";
import { CSSTransition } from "react-transition-group";
import { FlexBox } from 'react-styled-flex';

function Navigation({back, next, restart}) {
  const {nav, slideModel, progressBar} = useContext(SlideContext);
  const navRef = React.useRef(null);

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

  const isEndSlide = slideModel.getType() === 'End'


  // slideModel.restart()

  // const isValid = slideModel.validate ? slideModel.validate() : false;
  const isValid = slideModel.validate ? slideModel.validate() : false;
  const isBlocked = false

  // Scroll To Item
  useEffect(() => {
    if (!navRef.current || !isValid || isEndSlide) return
    if (navRef.current && isValid && !isEndSlide) {
      navRef.current.scrollIntoView(false, { behavior: "smooth" });
    }
  }, [isEndSlide, isValid]);

  return (
    <>
      <FlexBox gap="10px" reverse={nextSlideIsEndSlide} className="HbButtonGroup Navigation" column={size === 'small' && nextSlideIsEndSlide} center ref={navRef}>
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
      </FlexBox>
    </>
  );
}

// Navigation.whyDidYouRender = true

export default Navigation;