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
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [selectedResults, setSelectedResults] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [subscription, setSubscription] = useState(true)
    
    useEffect(() => {
        setData({
            hungry: window.hungry,
            ctrl: window.pickzen.ctrl
        })
    }, [])

    useEffect(() => console.log(data), [data])

    const subscribeMultiplier = subscription ? 0.8 : 1
    const getPrice = (price) => Math.round((price * subscribeMultiplier) * 100) / 100
    const totalProducts = selectedResults.length

    const continueToCheckout = () => {

        console.log('Going to checkout with :' + JSON.stringify(selectedResults))
    }

    return (
        <>
            {
                loading && (
                    <Loading setLoading={setLoading} timing={1000} outTiming={2500} />
                )
            }

            {/* {<Video />} */}

            <Products totalPrice={totalPrice} setTotalPrice={setTotalPrice} selectedResults={selectedResults} setSelectedResults={setSelectedResults} subscription={subscription} setSubscription={setSubscription} getPrice={getPrice} continueToCheckout={continueToCheckout} />

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