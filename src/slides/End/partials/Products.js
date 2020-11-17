import React, { useState, useEffect } from 'react';
import { FlexBox } from "react-styled-flex";
import { HbWave, colors, HbLinkButton, HbProductImage, textstyles, HbCheckbox2 } from '../../../visly'
import { HbSection } from '../../../visly/Pages'
import { HbProduct, HbProductEmpty, HbResults } from '../../../visly/Compounds'
import Switch from '../../../components/Switch'
import { useModal } from "react-modal-hook"
import ProductModal from './ProductModal'
import CustomHTML from '../../../components/CustomHTML/CustomHTML';



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
    texts,
    subscribePriceFactor,
    onlySubscription
}) => {

    const replacers = {
        kibble: 'meal',
        supplement: 'supplement',
        mixin: 'mixin'
    }

    const contact = (type) => `<p>Unfortunately we don’t have a Hungry Bark ${replacers[type]} to offer ${dog.gender === 'Male' ? 'him' : 'her'}. Want to discuss this further? Contact us at nutritionist@hungrybark.com</p>`
    const oops = `Oops… Looks like ${dog.name} has some very specific needs…`

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
        setSelectedResults([products.kibble, products.supplement, products.mixin])
    }, [products.kibble, products.supplement, products.mixin, setSelectedResults, products]);


    useEffect(() => {
        setTotalPrice(
            Math.round((
                selectedResults.length > 0 ? selectedResults.map((result) => result && result.price && result.price).reduce((a, b) => a + b) : 0
            ) * 100) / 100
        )
    }, [subscription, selectedResults, setTotalPrice])

    if (!results) return null

    const onAddResult = (result) => {
        if (!result) return
        if (selectedResults.includes(result)) {
            setSelectedResults(selectedResults.filter(r => r && r.sku !== result.sku))
        }
        else return setSelectedResults(selectedResults.concat(result))
    }

    const resultImages = selectedResults && selectedResults.map(result => result && result.images && result.images[result.selectedImage]);

    const roundNumber = (number) => Number(number).toFixed(2)

    return (
        <HbSection
            noMaxWidth
            waveslot1={<HbWave className="HbWave" double />}
            waveslot2={<HbWave className="HbWave" invert />}
            column
            alignItems="center"
            className="wave"
            style={{ backgroundColor: colors.hbGoldLight}}
            title={results ? 'Recommended Plan' : ''}
        >
            <FlexBox gap={'2%'} wrap className="HbCardContainer">
                {
                    products.kibble ? (
                        <HbProduct
                            imageSrc={products.kibble.images[products.kibble.selectedImage]}
                            order={1}
                            title={products.kibble.title}
                            extra={products.kibble.lbs14 + '    lbs'}
                            priceOriginal={ subscription && !onlySubscription ? `$${roundNumber(products.kibble.price)}` : '' }
                            priceFinal={`$${getPrice(products.kibble.price, subscription?subscribePriceFactor.trial:1)}`}
                            DescriptionHtml={
                                <CustomHTML style={{
                                    ...textstyles.hbFeatureText,
                                    color: colors.hbBrown
                                }} html={products.kibble.description} />
                            }
                            type={'Meal'}
                            details={<HbLinkButton text="See details" href="#" onPress={ () => viewProductDetails(products.kibble) }>See details</HbLinkButton>}
                            CardFooter={
                                <HbProduct.CardFooter
                                    onClick={() => onAddResult(products.kibble)}
                                    addLabel={selectedResults.includes(products.kibble) ? 'Added' : `Add ${'Meal'}` }
                                    HbCheckbox2={
                                        <HbCheckbox2 checked={selectedResults.includes(products.kibble)} />
                                    }
                                />
                            }
                            className="HbCard"
                        />
                    ) : (
                        <HbProductEmpty
                            order="1"
                            type={'Meal'}
                            oops={oops}
                            Extratext={
                                <CustomHTML style={{ ...textstyles.hbFeatureText, color: colors.hbBrown }}
                                    html={contact('kibble')}
                                />
                            }
                            className="HbCard"
                        />
                    )
                }
                {
                    products.supplement ? (
                        <HbProduct
                            imageSrc={products.supplement.images[products.supplement.selectedImage]}
                            order={2}
                            title={products.supplement.title}
                            extra={`${products.supplement.chews14 ? products.supplement.chews14 + ' count' : ''}`}
                            priceOriginal={ subscription && !onlySubscription ? `$${roundNumber(products.supplement.price)}` : '' }
                            priceFinal={`$${getPrice(products.supplement.price, subscription?subscribePriceFactor.trial:1)}`}
                            DescriptionHtml={
                                <CustomHTML style={{
                                    ...textstyles.hbFeatureText,
                                    color: colors.hbBrown
                                }} html={products.supplement.description} />
                            }
                            type={'Supplement'}
                            details={<HbLinkButton text="See details" href="#" onPress={ () => viewProductDetails(products.supplement) }>See details</HbLinkButton>}
                            CardFooter={
                                <HbProduct.CardFooter
                                    onClick={() => onAddResult(products.supplement)}
                                    addLabel={selectedResults.includes(products.supplement) ? 'Added' : `Add ${'Supplement'}` }
                                    HbCheckbox2={
                                        <HbCheckbox2 checked={selectedResults.includes(products.supplement)} />
                                    }
                                />
                            }
                            className="HbCard"
                        />
                    ) : (
                        <HbProductEmpty
                            order="2"
                            type={'Supplement'}
                            oops={oops}
                            Extratext={
                                <CustomHTML style={{ ...textstyles.hbFeatureText, color: colors.hbBrown }}
                                    html={contact('supplement')}
                                />
                            }
                            className="HbCard"
                        />
                    )
                }
                {
                    products.mixin ? (
                        <HbProduct
                            imageSrc={products.mixin.images[products.mixin.selectedImage]}
                            order={3}
                            title={products.mixin.title}
                            extra={`${products.mixin.bags} ${products.mixin.bags > 1 ? 'bags' : 'bag'}`}
                            priceOriginal={ subscription && !onlySubscription ? `$${roundNumber(products.mixin.price)}` : '' }
                            priceFinal={`$${getPrice(products.mixin.price, subscription?subscribePriceFactor.trial:1)}`}
                            DescriptionHtml={
                                <CustomHTML style={{
                                    ...textstyles.hbFeatureText,
                                    color: colors.hbBrown
                                }} html={products.mixin.description} />
                            }
                            type={'Mix-in'}
                            details={<HbLinkButton text="See details" href="#" onPress={ () => viewProductDetails(products.mixin) }>See details</HbLinkButton>}
                            CardFooter={
                                <HbProduct.CardFooter
                                    onClick={() => onAddResult(products.mixin)}
                                    addLabel={selectedResults.includes(products.mixin) ? 'Added' : `Add ${'Mixin'}` }
                                    HbCheckbox2={
                                        <HbCheckbox2 checked={selectedResults.includes(products.mixin)} />
                                    }
                                />
                            }
                            className="HbCard"
                        />
                    ) : (
                        <HbProductEmpty
                            order="3"
                            type={'Mixin'}
                            oops={oops}
                            Extratext={
                                <CustomHTML style={{ ...textstyles.hbFeatureText, color: colors.hbBrown }}
                                    html={contact('mixin')}
                                />
                            }
                            className="HbCard"
                        />
                    )
                }

                <HbResults
                    className="HbCard HbResults"
                    verylongname={`${dog.name}’s Plan`}
                    DescriptionHtml={
                        <CustomHTML style={{
                            ...textstyles.bodyReallySmall,
                            color: colors.hbBrown
                        }} html={texts.plan.trial} />
                    }
                    DescriptionHtml2={
                        <CustomHTML style={{
                            ...textstyles.bodyReallySmall,
                            color: colors.hbBrown
                        }} html={texts.plan.afterTrial} />
                    }
                    HbButton={<HbResults.HbButton onPress={continueToCheckout} />}
                    trialOff={!subscription}
                    children={onlySubscription || <Switch checked={!subscription} onChange={(e) => setSubscription(!subscription)} />}
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