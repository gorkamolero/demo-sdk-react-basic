import React, { useContext, useState } from 'react';
import { FlexBox } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";
import FormFields from "../../components/FormFields/FormFields";
import Navigation from '../../components/Navigation/Navigation'

function Form() {
    const { slideModel, nav, touched } = useContext(SlideContext);
    const [showErrors, setShowErrors] = useState(false);

    React.useEffect(() => {
      // nav.back();
      slideModel.validate()
      if (slideModel.validate()) {
      } else {
        setShowErrors(true);
      }
    }, [touched])
   
    return (
      <FlexBox column center>
        <FormFields showErrors={showErrors} fields={slideModel.getFields()} />

        <Navigation />
      </FlexBox>
    );
}

export default Form;