import React, { useContext, useState } from 'react';
import { FlexBox } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";
import FormFields from "../../components/FormFields/FormFields";
import Navigation from '../../components/Navigation/Navigation'

function Form() {
    const { slideModel, touched } = useContext(SlideContext);
    const [showErrors, setShowErrors] = useState(false);

    

    /* // NAVIGATE BACK ON ERROR
    const { nav } = useContext(SlideContext);
    React.useEffect(() => nav.back(), [nav]) */

    React.useEffect(() => {
      slideModel.validate()
      if (slideModel.validate()) {
      } else {
        setShowErrors(true);
      }
    }, [touched, slideModel])

   
    return (
      <FlexBox column center>
        <FormFields showErrors={showErrors} fields={slideModel.getFields()} />

        <Navigation />
      </FlexBox>
    );
}

export default Form;