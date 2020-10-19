import React, { useState, useEffect, useContext } from 'react';
import { FlexBox } from "react-styled-flex";
import { SlideContext } from '../../../context/SlideContext';
import { HbSection } from 'visly/Pages'
import { HbProduct } from '../../../visly/Compounds'
import { WaveContainer, Wave } from '../../../styles/StyledComps'

const Products = ({style}) => {
  const { slideModel } = useContext(SlideContext);
  const [results, setResults] = useState(null);

  useEffect(() => {
      const getResults = async () => {
          try {
              const results = await slideModel.getResults()
              setResults(results.map(result => ({
                  title: result.getTitle(),
                  image: result.getImage(),
                  id: result.getId(),
                  vendor: result.getVendor(),
                  price: result.getLocalizedPrice(),
                  description: result.getDescription(),
                  cta: result.getViewCTA(),
                  link: result.getLink(),
                  specs: result.getSpecs()
              })))
          } catch(reason) {
              console.error(reason);
          }
      }

      getResults()
  }, [slideModel])

  if (!results) return null
  return (
    <WaveContainer style={style}>
      <Wave />
      <HbSection column alignItems="center" className="wave" title="">
        <FlexBox gap={20}>
          {results.map((result, i) => {
            return (
              <HbProduct
                  key={result.id}
                  imageSrc={result.image}
                  order={i}
                  style={{ flex: 1 }}
                  title={result.title}
                  price={result.price}
                  description={result.description}
                  addLabel={result.cta}
              >

              </HbProduct>
            ) 
          } )}
        </FlexBox>
      </HbSection>
      <Wave invert />
    </WaveContainer>
  );
}
 
export default Products;