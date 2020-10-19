import React from 'react';
import { HbSection } from 'visly/Pages'
import { HbFeature, HbFeatureInvert } from 'visly/Compounds'

import Feature1IMG from '../../../assets/images/features/usp1-img.png'
import Feature2IMG from '../../../assets/images/features/usp2-img.png'
import Feature3IMG from '../../../assets/images/features/usp3-img.png'
import Feature4IMG from '../../../assets/images/features/usp4-img.png'
import styled from 'styled-components';

const FeatureSections = [
  {
    component: HbFeature,
    img: Feature1IMG,
    title: 'No two dogs are the same.',
    text: 'Superfood ingredients paired with real meat proteins like fresh chicken, lamb, turkey, duck, salmon and fortified with probiotics, vitamins and minerals.'
  },
  {
    component: HbFeatureInvert,
    img: Feature2IMG,
    title: 'Formulated by nutritionists. Praised by vets.',
    text: 'Superfood ingredients paired with real meat proteins like fresh chicken, lamb, turkey, duck, salmon and fortified with probiotics, vitamins and minerals.'
  },
  {
    component: HbFeature,
    img: Feature3IMG,
    title: 'Ingredients your mother would approve of.',
    text: 'Superfood ingredients paired with real meat proteins like fresh chicken, lamb, turkey, duck, salmon and fortified with probiotics, vitamins and minerals.'
  },
  {
    component: HbFeatureInvert,
    img: Feature4IMG,
    title: 'Good for them. Easy for you.',
    text: 'Superfood ingredients paired with real meat proteins like fresh chicken, lamb, turkey, duck, salmon and fortified with probiotics, vitamins and minerals.'
  }
]

const Section = styled(HbSection)`
  [role="img"] {
    height: 0;
    padding-bottom: 56.25%;
  }

`

const Features = () => {
  return (    
    <Section padded title="Smarter, Healthier Dog Food">
      {
        FeatureSections.map((feature) => (
          <feature.component
            key={feature.title}
            imageSrc={feature.img}
            HbFeatureItem={
              <HbFeature.HbFeatureItem 
                title={feature.title}
                text={feature.text}
              />
            }
          />
        ))
      }
    </Section>
  );
}
 
export default Features;