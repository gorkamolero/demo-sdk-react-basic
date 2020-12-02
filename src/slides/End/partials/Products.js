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
    products,
    dog,
    goals,
    texts,
    subscribePriceFactor,
    onlySubscription,
    buttonProgress,
    visibilityDiv,
    preselectedResults,
    ProgressButton,
    continueToCheckout
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
        setResults([products.kibble, products.supplement, products.mixin]);

        let preselected = preselectedResults.split(';').map(it => it==='1');

        setSelectedResults([products.kibble&&preselected[0]?products.kibble:null, products.supplement&&preselected[1]?products.supplement:null, products.mixin&&preselected[2]?products.mixin:null])
    }, [products.kibble, products.supplement, products.mixin, setSelectedResults, products, preselectedResults]);


    useEffect(() => {
        setTotalPrice(
            Math.round((
                selectedResults.length > 0 ? selectedResults.map((result) => result && result.price && result.price).reduce((a, b) => a + b) : 0
            ) * 100) / 100
        )
    }, [subscription, selectedResults, setTotalPrice])

    if (!results) return null

    const toggleSelectedResult = (result, index) => {
        if (!result) return

        let newValue = selectedResults[index]?null:result;
        /* eslint-disable eqeqeq*/
        setSelectedResults(selectedResults.map( (r,i) => i==index?newValue:selectedResults[i]));
        /* eslint-enable */
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
                            priceOriginal={ subscription ? `$${roundNumber(products.kibble.price)}` : '' }
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
                                    onClick={(e) => toggleSelectedResult(products.kibble, 0)}
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
                            priceOriginal={ subscription ? `$${roundNumber(products.supplement.price)}` : '' }
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
                                    onClick={() => toggleSelectedResult(products.supplement, 1)}
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
                            priceOriginal={ subscription ? `$${roundNumber(products.mixin.price)}` : '' }
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
                                    onClick={() => toggleSelectedResult(products.mixin, 2)}
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
                    className={`HbCard HbResults progress-${buttonProgress}`}
                    verylongname={`${dog.name}’s Plan`}
                    TrialHeading={texts.plan.rest.TrialHeading}
                    AfterTrialHeading={texts.plan.rest.AfterTrialHeading}
                    OneTimeBoxText={texts.plan.rest.OneTimeBoxText}
                    DescriptionHtml={
                        <CustomHTML style={{
                            ...textstyles.bodyReallySmall,
                            fontSize: '14px',
                            color: colors.hbBrown
                        }} html={texts.plan.trial} />
                    }
                    DescriptionHtml2={
                        <CustomHTML style={{
                            ...textstyles.bodyReallySmall,
                            fontSize: '14px',
                            color: colors.hbBrown
                        }} html={texts.plan.afterTrial} />
                    }
                    HbButton={<ProgressButton action={continueToCheckout} />}
                    trialOff={!subscription}
                    children={onlySubscription || <Switch texts={texts} checked={!subscription} onChange={(e) => setSubscription(!subscription)} />}
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
            {visibilityDiv}
        </HbSection>
    );
}

export default Products;