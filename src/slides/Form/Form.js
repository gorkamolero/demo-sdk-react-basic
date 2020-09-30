import React, { useContext, useState } from 'react';
import { FlexBox } from "react-styled-flex";
import { SlideContext } from "../../context/SlideContext";
import FormFields from "../../components/FormFields/FormFields";
import Navigation from '../../components/Navigation/Navigation'

function Form() {
    const { slideModel, nav } = useContext(SlideContext);
    const [showErrors, setShowErrors] = useState(false);

    const next = () => {
        if (slideModel.validate()) {
            nav.next();
        } else {
            setShowErrors(true);
        }
    };

    return (
      <FlexBox column center>
        <FormFields validate={slideModel.validate} showErrors={showErrors} fields={slideModel.getFields()} />

        <Navigation next={next} />
      </FlexBox>
    );
}

export default Form;