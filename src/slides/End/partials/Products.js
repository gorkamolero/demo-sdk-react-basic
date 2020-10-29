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
  1: 'Supplement',
  2: 'Mix-in',
  3: 'Meal'
}

const Products = ({
  style,
  selectedResults,
  setSelectedResults,
  subscription,
  setSubscription,
  setTotalPrice,
  getPrice,
  continueToCheckout,
}) => {
  const { slideModel } = useContext(SlideContext);
  const [results, setResults] = useState(null);
  

  const [showModal, hideModal] = useModal(() => <ProductModal hideModal={hideModal} />, []);

  console.log(getPrice)

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
                  price: result.getPrice(),
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



  useEffect(() => {
    setTotalPrice(
      selectedResults.length > 0 ? selectedResults.map(({price}) => price).reduce((a, b) => a + b) : 0
    )
  }, [subscription, selectedResults, setTotalPrice])

  if (!results) return null

  const onAddResult = (result) => {
    if (selectedResults.includes(result)) return setSelectedResults(selectedResults.filter(r => !r))
    else return setSelectedResults(selectedResults.concat(result))
  }

  console.log(results)
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
              order={i + 1}
              style={{ flex: 1 }}
              title={result.title}
              priceOriginal={ subscription ? '$' + result.price : '' }
              priceFinal={`$${getPrice(result.price)}`}
              description={result.description}
              addLabel={selectedResults.includes(result) ? 'Added' : `Add ${ProductType[i + 1]}` }
              type={ProductType[i]}
              details={<HbLinkButton text="See details" href="#" onPress={showModal}>See details</HbLinkButton>}
              HbCheckbox={<HbProduct.HbCheckbox checked={selectedResults.includes(result)} onChange={() => onAddResult(result)} />} 
            >

            </HbProduct>
          ) 
        } )}
        <HbResults
          style={{ flex: 1 }}
          description="Small batch cooked at lower temperatures and made with real chicken and turkey, added probiotics and natural ingredients"
          verylongname="Averylongname’s Plan"
          description1="Your 4 week plan will be billed at the discounted price of $45.36 every 4 weeks. That’s only $1.62/day. No commitment. Modify, swap or cancel anytime."
          HbButton={<HbResults.HbButton onPress={continueToCheckout} />}
          children={<Switch checked={!subscription} onChange={(e) => setSubscription(!subscription)} />}
        />
      </FlexBox>
    </HbSection>
  );
}
 
export default Products;