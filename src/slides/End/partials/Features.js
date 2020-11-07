import React, {useContext, useEffect, useState} from 'react';
import { SlideContext } from "../../../context/SlideContext";
import { HbSection } from '../../../visly/Pages'
import { HbFeature, HbFeatureInvert } from '../../../visly/Compounds'

import styled from 'styled-components';

const TableID = 'Oh2dNlC5naB'

const Section = styled(HbSection)`
  [role="img"] {
    height: 0;
    padding-bottom: 56.25%;
  }

`

const Features = () => {
  const { getDatasheet } = useContext(SlideContext)
  const [ features, setFeatures ] = useState([])

  useEffect(() => {
    const id = TableID
    const getFeatures = async () => {
      try {
        let features = await getDatasheet([{id}])
        // console.log(testimonials)
        features = features.result[id]

        setFeatures(features)
      } catch(err) {
        console.error(err)
      }
    }

    getFeatures()
  }, [getDatasheet])

  if (!features) return null
  return (    
    <Section padded title="Smarter, Healthier Dog Food">
      {
        features.map((feature, i) =>
          i % 2 ? (
            <HbFeature
              key={feature.Title}
              imageSrc={feature.Image}
              HbFeatureItem={
                <HbFeature.HbFeatureItem 
                  title={feature.Title}
                  text={feature.Text}
                />
              }
            />
          ) : (
            <HbFeatureInvert
              key={feature.Title}
              imageSrc={feature.Image}
              HbFeatureItem={
                <HbFeature.HbFeatureItem 
                  title={feature.Title}
                  text={feature.Text}
                />
              }
            />
          )
        )
      }
    </Section>
  );
}

export default Features;