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
    0: 'Meal',
    1: 'Supplement',
    2: 'Mix-in'
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
                      products,
                      dog,
                      goals,
                      texts
                  }) => {


    const [results, setResults] = useState(null);
    const [modalData, setModalData] = useState(null);

    const [showModal, hideModal] = useModal(() => <ProductModal hideModal={hideModal} product={modalData.product} dog={modalData.dog} goals={modalData.goals} texts={modalData.texts}/>, [modalData]);

    const viewProductDetails = (product) => {
        setModalData({product, dog:dog, goals:goals, texts:texts});
        showModal();
    };

    useEffect(() => {
        setResults([products.kibble, products.supplement, products.mixin])
    }, []);


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

    return (
        <HbSection
            noMaxWidth
            waveslot1={<HbWave double />}
            waveslot2={<HbWave invert />}
            column
            alignItems="center"
            className="wave"
            title=""
            style={{ backgroundColor: colors.hbGoldLight}}
        >
            <FlexBox gap={'2%'}>
                {results.map((result, i) => {
                    return (
                        result?<HbProduct
                            key={i}
                            imageSrc={result.images[result.selectedImage]}
                            order={i + 1}
                            style={{ flexBasis: '20%' }}
                            title={result.title}
                            priceOriginal={ subscription ? '$' + result.price : '' }
                            priceFinal={`$${getPrice(result.price)}`}
                            description={result.description}
                            addLabel={selectedResults.includes(result) ? 'Added' : `Add ${ProductType[i]}` }
                            type={ProductType[i]}
                            details={<HbLinkButton text="See details" href="#" onPress={ () => viewProductDetails(result) }>See details</HbLinkButton>}
                            HbCheckbox={<HbProduct.HbCheckbox checked={selectedResults.includes(result)} onChange={() => onAddResult(result)} />}
                        >
                        </HbProduct>:null
                    )
                } )}

                <HbResults
                    style={{ flexBasis: '20%' }}
                    description={texts.plan.trial}
                    verylongname={`${dog.name}’s Plan`}
                    description1={texts.plan.afterTrial}
                    HbButton={<HbResults.HbButton onPress={continueToCheckout} />}
                    children={<Switch checked={!subscription} onChange={(e) => setSubscription(!subscription)} />}
                />
            </FlexBox>
        </HbSection>
    );
}

export default Products;