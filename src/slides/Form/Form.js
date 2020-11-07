import React, { useContext, useState, useEffect, useCallback } from 'react';
import { FlexBox } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";
import FormFields from "../../components/FormFields/FormFields";
import Navigation from '../../components/Navigation/Navigation'
import { motion, AnimatePresence } from "framer-motion"


export function useForceUpdate() {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick(tick => tick + 1);
  }, [])
  return update;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: '100vh',
  },
  in: {
    opacity: 1,
    y: 0,
  },
  out: {
    opacity: 0,
    y: '-100vh',
  },
}

function Form() {
  const { slideModel, touched } = useContext(SlideContext);
  const [showErrors, setShowErrors] = useState(false);
  const fields = slideModel.getFields()
  const id = slideModel.getId()

  useEffect(() => {
    slideModel.validate()

    if (slideModel.validate()) {
    } else {
      setShowErrors(true);
    }
  }, [touched, slideModel])
  
  return (
    <AnimatePresence>
      <FlexBox column center className="slideAnimate" key={id} data-key={id}>
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={{ duration: 0.35 }}
        >
          <FormFields showErrors={showErrors} fields={fields}>
            <Navigation />
          </FormFields>
        </motion.div>
      </FlexBox>      
    </AnimatePresence>
  );  
}

export default Form;