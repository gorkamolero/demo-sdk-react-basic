import React, { useEffect, useState } from 'react';
import './End.css'
import Navigation from "../../components/Navigation/Navigation";
import Loading from '../../components/Loading';
import Products from './partials/Products'
import Features from './partials/Features'
import Testimonials from './partials/Testimonials'
// import Video from './partials/Video'
import { Footer } from '../../styles/StyledComps';

function End() {
    // No loading for dev
    const end = window.hungry.end;
    const dog = {
        name:end.dogName,
        weight:end.dogWeight
    };

    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState({
        kibble:end.kibble,
        supplement:end.supplement,
        mixin:end.mixin
    });

    const [selectedResults, setSelectedResults] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [subscription, setSubscription] = useState(true)

    const subscribeMultiplier = subscription ? 0.8 : 1
    const getPrice = (price) => Math.round((price * subscribeMultiplier) * 100) / 100
    const totalProducts = selectedResults.length

    const continueToCheckout = () => {
        console.log('Going to checkout with :' + JSON.stringify(selectedResults))
    }

    const getTexts = () => {
        let trialText = end.texts.plan.trialText.replace('[PRICETRIAL]',getPrice(totalPrice*0.8));
        let afterTrialText = end.texts.plan.afterTrialText.replace('[PRICE]',getPrice(totalPrice*0.9)).replace('[PRICEPERDAY]',getPrice(totalPrice*0.9/28)).replace('[SHIPPING]',end.getShippingText(totalPrice));

        return {
            plan:{
                trial:trialText,
                afterTrial:afterTrialText
            }
        }
    }

    return (
        <>
            {
                loading && (
                    <Loading setLoading={setLoading} timing={1000} outTiming={2500} />
                )
            }

            {/* {<Video />} */}

            <Products products={products} dog={dog} goals={end.goals} texts={getTexts()} totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedResults={selectedResults} setSelectedResults={setSelectedResults} subscription={subscription} setSubscription={setSubscription} getPrice={getPrice} continueToCheckout={continueToCheckout} />

            <Navigation />

            <Features />

            <Testimonials />

            <Footer
                total={`Total (${totalProducts})`}
                priceOriginal={subscription && selectedResults.length ? '$' + totalPrice : ''}
                priceFinal={'$' + getPrice(totalPrice)}
                HbButtonWithIcon={<Footer.HbButtonWithIcon onPress={continueToCheckout} />} 
            />
        </>
    );

}

export default End;