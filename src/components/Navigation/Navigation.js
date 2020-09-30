import React, { useContext } from 'react';
import { SlideContext } from '../../context/SlideContext';
import './Navigation.css'
import { HbButtonGroup, HbButton } from "visly";

function Navigation({back, next, restart}) {
    const {nav} = useContext(SlideContext);

    // Allow handlers override
    back = back || nav.back;
    next = next || nav.next;
    restart = restart || nav.restart;

    return (
      <HbButtonGroup>
        {nav.canBack && (
          <HbButton
            text="Go back"
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
            disabled={!nav.canNext}
            onPress={() => next()}
          />
        )}
      </HbButtonGroup>
    );
}

export default Navigation;