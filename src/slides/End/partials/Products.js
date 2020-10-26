import React, { useState, useEffect, useContext } from 'react';
import { FlexBox } from "react-styled-flex";
import { SlideContext } from '../../../context/SlideContext';
import { HbWave, colors, HbLinkButton } from '../../../visly'
import { HbSection } from '../../../visly/Pages'
import { HbProduct, HbResults } from '../../../visly/Compounds'
import Switch from '../../../components/Switch'
import { useModal } from "react-modal-hook"
import ProductModal from './ProductModal'


const ProductType = {
  0: 'Supplement',
  1: 'Mix-in',
  2: 'Meal'
}

const Products = ({style}) => {
  const { slideModel } = useContext(SlideContext);
  const [results, setResults] = useState(null);

  const [showModal, hideModal] = useModal(() => <ProductModal hideModal={hideModal} />, []);


  useEffect(() => {
      const getResults = async () => {
          try {
              const results = await slideModel.getResults()
              console.log('RESULTS', results)
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
    <HbSection
      noMaxWidth
      waveslot1={<HbWave double />}
      waveslot2={<HbWave invert />}
      column
      alignItems="center"
      className="wave"
      title=""
      style={{ backgroundColor: colors.hbGoldLight }}
    >
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
              type={ProductType[i]}
              details={<HbLinkButton text="See details" href="#" onPress={showModal}>See details</HbLinkButton>}
            >

            </HbProduct>
          ) 
        } )}
        <HbResults
          style={{ flex: 1 }}
          description="Small batch cooked at lower temperatures and made with real chicken and turkey, added probiotics and natural ingredients"
          verylongname="Averylongname’s Plan"
          description1="Your 4 week plan will be billed at the discounted price of $45.36 every 4 weeks. That’s only $1.62/day. No commitment. Modify, swap or cancel anytime."
          HbButton={<HbResults.HbButton />}
          children={<Switch />}
        />
      </FlexBox>
    </HbSection>
  );
}
 
export default Products;