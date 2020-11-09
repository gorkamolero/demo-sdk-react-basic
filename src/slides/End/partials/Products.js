import React, { useState, useEffect } from 'react';
import { FlexBox } from "react-styled-flex";
import { HbWave, colors, HbLinkButton, HbProductImage, textstyles } from '../../../visly'
import { HbSection } from '../../../visly/Pages'
import { HbProduct, HbProductEmpty, HbResults } from '../../../visly/Compounds'
import Switch from '../../../components/Switch'
import { useModal } from "react-modal-hook"
import ProductModal from './ProductModal'
import CustomHTML from '../../../components/CustomHTML/CustomHTML';


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

    const [showModal, hideModal] = useModal(() => (
        <ProductModal hideModal={hideModal} product={modalData.product} dog={modalData.dog} goals={modalData.goals} texts={modalData.texts}/>
    ), [modalData]);

    const viewProductDetails = (product) => {
        setModalData({product, dog:dog, goals:goals, texts:texts});
        showModal();
    };

    useEffect(() => {
        setResults([products.kibble, products.supplement, products.mixin])
    }, [products.kibble, products.supplement, products.mixin]);


    useEffect(() => {
        setTotalPrice(
            Math.round((
                selectedResults.length > 0 ? selectedResults.map(({price}) => price).reduce((a, b) => a + b) : 0
            ) * 100) / 100
        )
    }, [subscription, selectedResults, setTotalPrice])

    if (!results) return null

    const onAddResult = (result) => {
        if (selectedResults.includes(result)) return setSelectedResults(selectedResults.filter(r => !r))
        else return setSelectedResults(selectedResults.concat(result))
    }

    const resultImages = results.map(result => result && result.images && result.images[result.selectedImage]);

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
                {
                    results.map((result, i) => (
                        <>
                            {
                                result ? (
                                    <HbProduct
                                        key={i}
                                        imageSrc={result.images[result.selectedImage]}
                                        order={i + 1}
                                        title={result.title}
                                        priceOriginal={ subscription ? '$' + result.price : '' }
                                        priceFinal={`$${getPrice(result.price)}`}
                                        DescriptionHtml={
                                            <CustomHTML style={{
                                                ...textstyles.hbFeatureText,
                                                color: colors.hbBrown
                                            }} html={result.description} />
                                        }
                                        addLabel={selectedResults.includes(result) ? 'Added' : `Add ${ProductType[i]}` }
                                        type={ProductType[i]}
                                        details={<HbLinkButton text="See details" href="#" onPress={ () => viewProductDetails(result) }>See details</HbLinkButton>}
                                        HbCheckbox={
                                            <HbProduct.HbCheckbox checked={selectedResults.includes(result)} onChange={() => onAddResult(result)} />
                                        }
                                        style={{ width: '23.5%' }}
                                    />
                                ) : <HbProductEmpty
                                        type={ProductType[i]}
                                        Extratext={
                                            <CustomHTML
                                                style={{
                                                    ...textstyles.hbFeatureText,
                                                    color: colors.hbBrown
                                                }}
                                                html={
                                                    '<p>Unfortunately we don’t have a Hungry Bark Supplement to offer him. Want to discuss this further? <a class="inheritColor" href="mailto:x@hungrybark.com">Contact us</a></p>'
                                                }
                                            />
                                        }
                                        style={{ width: '23.5%' }}
                                    />
                            }
                        </>
                    ))
                }

                <HbResults
                    style={{ width: '23.5%' }}
                    verylongname={`${dog.name}’s Plan`}
                    // trial={texts.plan.trial}
                    // afterTrial={texts.plan.afterTrial}
                    DescriptionHtml={
                        <CustomHTML style={{
                            ...textstyles.hbFeatureText,
                            color: colors.hbBrown
                        }} html={texts.plan.trial} />
                    }
                    DescriptionHtml2={
                        <CustomHTML style={{
                            ...textstyles.hbFeatureText,
                            color: colors.hbBrown
                        }} html={texts.plan.afterTrial} />
                    }
                    HbButton={<HbResults.HbButton onPress={continueToCheckout} />}
                    trialOff={!subscription}
                    children={<Switch checked={!subscription} onChange={(e) => setSubscription(!subscription)} />}
                    ImageSlot={
                        resultImages.map(img => (
                            <>
                                {
                                    img && <HbProductImage imageSrc={img} style={{ marginLeft: -15 }} />
                                }
                            </>
                        ))
                    }
                />
            </FlexBox>
        </HbSection>
    );
}

export default Products;