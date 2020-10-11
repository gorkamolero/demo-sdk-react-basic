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

  const isValid = slideModel.validate();

  return (
    <CSSTransition
      in={isValid}
      timeout={200}
      classNames="collapse-after"
      unmountOnExit
      mountOnEnter
    >
      <HbButtonGroup>
        {nav.canBack && (
            <HbButton
              text="Previous step"
              variant="contained"
              disabled={!nav.canBack}
              onPress={() => back()}
            />
        )}

        {nav.canRestart && (
          <HbButton
            text="Restart"
            disabled={!nav.canRestart}
            onPress={() => restart()}
          />
        )}

        {nav.canNext && (
          <HbButton
            text="Continue"
            // disabled={!nav.canNext}
            onPress={() => next()}
          />
        )}
      </HbButtonGroup>
    </CSSTransition>
  );
}

export default Navigation;