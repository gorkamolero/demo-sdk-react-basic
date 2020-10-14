import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import './Navigation.css'
import { HbButtonGroup, HbButton } from "../../visly";
import { CSSTransition } from "react-transition-group";

function Navigation({back, next, restart}) {
  const {nav, slideModel} = useContext(SlideContext);

  // Allow handlers override
  back = back || nav.back;
  next = next || nav.next;
  restart = restart || nav.restart;

  const isValid = slideModel.validate ? slideModel.validate() : false;

  return (
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
        in={isValid && nav.canNext}
        timeout={200}
        classNames="collapse-after"
        unmountOnExit
        mountOnEnter
      >
        <HbButton
          text="Continue"
          disabled={!nav.canNext}
          onPress={() => next()}
        />
      </CSSTransition>
    </HbButtonGroup>
  );
}

export default Navigation;